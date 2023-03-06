import { Server } from "socket.io";
import { Chat, ChatNotification, Message, Video } from "../domain/entities";
import { HttpRequest } from "../presentation/interfaces/http";
import { AddVideoToHistoricFactory, AddViewFactory, CreateChatFactory, CreateChatNotificationsFactory, CreateMessageFactory, EditMessageFactory, GetLoggedUserDataFactory, GetVideoFactory } from "./factories/controllers";
import { AuthenticationFactory } from "./factories/middlewares";

interface SocketConnection {
    socketId: string
    userId: string
    userEmail: string
    userName: string
    connectedChat: number | null
}

const connectedClients : SocketConnection[] = []

interface NewMessageInfo{
  content: string
  chatId: number
  file?: string
  videoId?: number
}

interface EditMessageInfo{
  content: string
  messageId: number
}

interface TypingUser{
  chat: Chat
  users: {
    socketId: string,
    control: number
  }[]
}

const typingUsers : TypingUser[] = []

interface TypingResponse{
  users: {
    email: string,
    name: string
  }[]
  chat: Chat
}

interface CreateChatInterface {
  isPersonal: boolean
  otherUsersEmails: string[];
  groupName?: string;
  groupImage?: string;
}

interface PublicUser{
  socketId: string
  userId: number | null
  viewing: CheckViewInterface | null
}

interface CheckViewInterface{
  video: Video
  prevTime: number
  totalViewed: number
  addedView: boolean
}

interface PingViewInterface{
  videoId: number
  currentTime: number  
  playbackRate: number
}

const publicUsers : PublicUser[] = []

export function Socket(io: Server){
    io.of("/public").use(async (socket, next) => {
      const token = socket.handshake.auth.token as string
      if(!token){
        publicUsers.push({
          socketId: socket.id,
          userId: null,
          viewing: null
        })  
        next()
        return
      }
        
      const auth = new AuthenticationFactory().make()
      const res = await auth.handle({
        headers: {
            token: token
        }
      })

      const userData = new GetLoggedUserDataFactory().make()
      const userRes = await userData.handle({
        body: {
          userId: res.body.userId ?? null
        }
      })

      if(res.statusCode === 200 && userRes.statusCode === 200)
          publicUsers.push({
            socketId: socket.id,
            userId: res.body.userId,
            viewing: null
        })  
      else
        publicUsers.push({
          socketId: socket.id,
          userId: null,
          viewing: null
        })  
      next()   
    })

    io.of("/public").on("connection", (socket) => {
      socket.on("disconnect", async () => {
        const user = publicUsers.find(u => u.socketId === socket.id)
        if(!user)
          return
        
        if(user.userId && user.viewing?.prevTime && Math.floor(user.viewing.prevTime)){
          const addToHistoric = new AddVideoToHistoricFactory().make()
          await addToHistoric.handle({
            body: {
              userId: user.userId,
              videoId: user.viewing.video.id,
              watchedTime: Math.floor(user.viewing.prevTime)
            }
          })
        }

        const index = publicUsers.findIndex(u => u.socketId === socket.id)
        publicUsers.splice(index, 1)
      })

      socket.on("begin_video", async (videoId: number, cb: (ok: boolean) => void) => {
        const publicUser = publicUsers.find(u => u.socketId === socket.id)
        if(!publicUser)
          return
        
        const getVideo = new GetVideoFactory().make() 
        const res = await getVideo.handle({
          params: {
            id: videoId
          },
          body: {}
        })

        if(res.statusCode === 200 && !publicUser.viewing){ 
          publicUser.viewing = {
            video: res.body,
            prevTime: 0,
            totalViewed: 0,
            addedView: false
          }
          
          cb(true)
        } else {
          cb(false)
        }

      })

      socket.on("ping_video", async ({currentTime, playbackRate}: PingViewInterface, cb: (ended: boolean) => void) => {
        const userView = publicUsers.find(u => u.socketId === socket.id)
        if(!userView || !userView.viewing)
          return
        if(currentTime - userView.viewing.prevTime >= 0.9*playbackRate && currentTime - userView.viewing.prevTime <= 1.1*playbackRate)
          userView.viewing.totalViewed += playbackRate
        userView.viewing.prevTime = currentTime
        if(userView.viewing.totalViewed >= userView.viewing.video.duration / 2 && !userView.viewing.addedView){
          const addView = new AddViewFactory().make()
          await addView.handle({
            body: {
              videoId: userView.viewing.video.id
            }
          })
          cb(false)
          userView.viewing.addedView = true
        } else if(userView.viewing.totalViewed >= userView.viewing.video.duration-2){
          cb(true)
        } else {
          cb(false)
        }
      })

      socket.on("end_video", async () => {
        const user = publicUsers.find(u => u.socketId === socket.id)
        if(!user || !user.viewing)
          return
        if(user.userId && user.viewing.prevTime && Math.floor(user.viewing.prevTime)){
          const addToHistoric = new AddVideoToHistoricFactory().make()
          const res = await addToHistoric.handle({
            body: {
              userId: user.userId,
              videoId: user.viewing.video.id,
              watchedTime: Math.floor(user.viewing.prevTime)
            }
          })
        }
        user.viewing = null
      })
    })

    io.use(async (socket, next) => {
      const auth = new AuthenticationFactory().make()
      const res = await auth.handle({
        headers: {
            token: socket.handshake.auth.token
        }
      })
      const userData = new GetLoggedUserDataFactory().make()
      const userRes = await userData.handle({
        body: {
          userId: res.body.userId
        }
      })

      if(res.statusCode !== 200 || userRes.statusCode !== 200)
        next(new Error('Authentication failed'))
      else {
        connectedClients.push({
            socketId: socket.id,
            userId: res.body.userId,
            userEmail: userRes.body.email,
            userName: userRes.body.name,
            connectedChat: null
        })
        next()  
      }  
    })

    io.on("connection", (socket) => {
        socket.on("enter_chat", (chatId: number | null) => {
          const client = connectedClients.find(client => client.socketId === socket.id)
          if(client) client.connectedChat = chatId
        })

        socket.on("disconnect", () => {
            const index = connectedClients.findIndex(client => client.socketId === socket.id)
            index >= 0 && connectedClients.splice(index, 1)
        })

        socket.on("new_message", async (info: NewMessageInfo) => {
          const index = connectedClients.findIndex(client => client.socketId === socket.id)

          const createMessage = new CreateMessageFactory().make()
          const request : HttpRequest = {
            body: {
              userId: connectedClients[index].userId,
              chatId: info.chatId,
            }
          }
          if(info.content) request.body.content = info.content
          if(info.file) request.body.file = info.file
          if(info.videoId) request.body.videoId = info.videoId
          
          const res = await createMessage.handle(request)
          if(res.statusCode === 200){
            const message = res.body as Message
            if(message.chat){
              const excludeUsersEmails : string[] = []

              for(const user of message.chat.users){
                const client = connectedClients.find(client => client.userEmail === user.email 
                  && client.connectedChat === message.chat?.id)
                if(!client)
                  continue
                user.email && excludeUsersEmails.push(user.email)
                io.to(client.socketId).emit("recieve_message", message)
              }

              const createNotifications = new CreateChatNotificationsFactory().make()
              const res = await createNotifications.handle({
                body: {
                  chatId: message.chat.id,
                  messageId: message.id,
                  excludeUsersEmails: excludeUsersEmails
                }
              }) 

              if(res.statusCode === 200){

                const notifications = res.body as ChatNotification[]
                for(const notification of notifications){
                  const client = connectedClients.find(client => client.userEmail === notification.reciever 
                    && client.connectedChat !== message.chat?.id)

                  if(!client)
                    continue 
                  io.to(client.socketId).emit("recieve_notification", notification)
                }
              }
            }
              

            const typingInChat = typingUsers.find(typ => typ.chat.id === info.chatId)
            if(typingInChat){
              const index = typingInChat.users.findIndex(u => u.socketId === socket.id)
              index >= 0 && typingInChat.users.splice(index, 1)
            }
          }
        })

        socket.on("edit_message", async (infos: EditMessageInfo) => {
          const client = connectedClients.find(c => c.socketId === socket.id)

          const editMessageController = new EditMessageFactory().make()
          const res = await editMessageController.handle({
            body: {
              userId: client?.userId,
              messageId: infos.messageId,
              content: infos.content
            }
          })

          if(res.statusCode === 200){
            const editedMessage : Message = res.body

            if(editedMessage.chat){
              for(const user of editedMessage.chat.users){
                const client = connectedClients.find(c => c.userEmail === user.email &&
                  c.connectedChat === editedMessage.chat?.id)
                if(!client)
                  continue
                io.to(client.socketId).emit("recieve_edited_message", editedMessage)
              }
            }   
          }
      })

        socket.on("typing", (chat: Chat) => {
          const typingInChat = typingUsers.find(typ => typ.chat.id === chat.id)
          if(!typingInChat){
            typingUsers.push({
              chat: chat,
              users: [{
                socketId: socket.id,
                control: 1
              }]
            })
          } else {
            const typingUserInChat = typingInChat.users.find(u => u.socketId === socket.id)
            if(!typingUserInChat)
              typingInChat.users.push({
                socketId: socket.id,
                control: 1
              })
            else
              typingUserInChat.control += 1
          }
        })

        socket.on("new_chat", async (infos: CreateChatInterface, cb:(err: string, success: boolean) => void) => {
          const index = connectedClients.findIndex(client => client.socketId === socket.id)
          const createChat = new CreateChatFactory().make()
          const res = await createChat.handle({
            body: {
              ...infos,
              userId: connectedClients[index].userId
            }
          })

          if(res.statusCode === 404 && res.body.message === "Personal chat already exists"){
            cb && cb("This chat already exists", false)
          }
          if(res.statusCode === 200){
            const chat = res.body as Chat
            for(const user of chat.users){
              const client = connectedClients.find(client => client.userEmail === user.email)
              if(!client)
                continue
              io.to(client.socketId).emit("recieve_chat", chat)
            }
            cb && cb("", true)
          }
        })
    })    

    setInterval(() => {
      for(const typingInChat of typingUsers){
        const typingResponse : TypingResponse = {
          users: [],
          chat: typingInChat.chat
        }

        for(const user of typingInChat.users){
          if(user.control <= 0){
            const index = typingInChat.users.findIndex(u => u.socketId === user.socketId)
            index >= 0 && typingInChat.users.splice(index, 1)
            continue
          }

          user.control -= 2
          const client = connectedClients.find(c => c.socketId === user.socketId)
          client && typingResponse.users.push({
            email: client.userEmail,
            name: client.userName
          })
        }

        for(const user of typingInChat.chat.users){
          const client = connectedClients.find(client => client.userEmail === user.email)
          if(!client)
            continue
          io.to(client.socketId).emit("other_typing", typingResponse)
        }

        if(typingInChat.users.length === 0){
          const index = typingUsers.findIndex(typ => typ.chat.id === typingInChat.chat.id)
          index >= 0 && typingUsers.splice(index, 1)
          continue
        }
      }
    }, 500)
}
