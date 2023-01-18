import { Server } from "socket.io";
import { Chat, Message } from "../domain/entities";
import { CreateMessageFactory, GetLoggedUserDataFactory } from "./factories/controllers";
import { AuthenticationFactory } from "./factories/middlewares";

interface SocketConnection {
    socketId: string
    userId: string
    userEmail: string
}

const connectedClients : SocketConnection[] = []

interface NewMessageInfo{
  content: string
  chatId: number
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
            userEmail: userRes.body.email
        })
        console.log(connectedClients)
        next()  
      }  
    })

    io.on("connection", (socket) => {
        socket.on("disconnect", () => {
            const index = connectedClients.findIndex(client => client.socketId === socket.id)
            connectedClients.splice(index, 1)
            console.log(connectedClients)
        })

        socket.on("new_message", async (info: NewMessageInfo) => {
          const index = connectedClients.findIndex(client => client.socketId === socket.id)

          const createMessage = new CreateMessageFactory().make()
          const res = await createMessage.handle({
            body: {
              userId: connectedClients[index].userId,
              content: info.content,
              chatId: info.chatId
            }
          })
          if(res.statusCode === 200){
            const message = res.body as Message
            for(const user of message.chat.users){
              const client = connectedClients.find(client => client.userEmail === user.email)
              if(!client)
                continue
              io.to(client.socketId).emit("recieve_message", message)
            }
          }
        })
    })

    
}
