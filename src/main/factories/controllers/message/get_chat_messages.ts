import { GetChatMessagesService } from "../../../../application/services"
import { ChatRepository, MessageRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetChatMessagesController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetChatMessagesFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField("chatId").number().min(1).getError(),
            this.validation.builder.setField("page").number().min(1).getError(),
            this.validation.builder.setField("rows").number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const chatRepository = new ChatRepository()
        const messageRepository = new MessageRepository()
        const getChatMessagesService = new GetChatMessagesService(userRepository, chatRepository, messageRepository)
        return new GetChatMessagesController(getChatMessagesService)
    }
}