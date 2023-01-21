import { Server } from "socket.io";
import { Chat, Message } from "../domain/entities";
import { HttpRequest } from "../presentation/interfaces/http";
import { CreateChatFactory, CreateMessageFactory, GetLoggedUserDataFactory, GetUserDataByEmailFactory } from "./factories/controllers";
import { AuthenticationFactory } from "./factories/middlewares";

interface SocketConnection {
    socketId: string
    userId: string
    userEmail: string
    userName: string
}

const connectedClients : SocketConnection[] = []

interface NewMessageInfo{
  content: string
  chatId: number
  file?: string
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

export function Socket(io: Server){
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
            userName: userRes.body.name
        })
        console.log(connectedClients)
        next()  
      }  
    })

    io.on("connection", (socket) => {
        socket.on("disconnect", () => {
            const index = connectedClients.findIndex(client => client.socketId === socket.id)
            index >= 0 && connectedClients.splice(index, 1)
            console.log(connectedClients)
        })

        socket.on("new_message", async (info: NewMessageInfo) => {
          const index = connectedClients.findIndex(client => client.socketId === socket.id)

          const createMessage = new CreateMessageFactory().make()
          const request : HttpRequest = {
            body: {
              userId: connectedClients[index].userId,
              content: info.content,
              chatId: info.chatId
            }
          }
          if(info.file)
            request.body.file = info.file
          const res = await createMessage.handle(request)
          if(res.statusCode === 200){
            const message = res.body as Message
            for(const user of message.chat.users){
              const client = connectedClients.find(client => client.userEmail === user.email)
              if(!client)
                continue
              io.to(client.socketId).emit("recieve_message", message)
            }

            const typingInChat = typingUsers.find(typ => typ.chat.id === info.chatId)
            if(typingInChat){
              const index = typingInChat.users.findIndex(u => u.socketId === socket.id)
              index >= 0 && typingInChat.users.splice(index, 1)
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
