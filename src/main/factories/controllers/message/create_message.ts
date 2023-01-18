import { CreateMessageService } from "../../../../application/services"
import { ChatRepository, MessageRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateMessageController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class CreateMessageFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField("content").string().minLength(1).maxLength(250).getError(),
            this.validation.builder.setField("chatId").number().min(1).getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const chatRepository = new ChatRepository()
        const messageRepository = new MessageRepository()
        const createMessageService = new CreateMessageService(userRepository, chatRepository, messageRepository)
        return new CreateMessageController(createMessageService)
    }
}