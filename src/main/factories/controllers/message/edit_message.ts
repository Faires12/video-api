import { EditMessageService } from "../../../../application/services"
import { MessageRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { EditMessageController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class EditMessageFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField("content").string().minLength(1).maxLength(250).getError(),
            this.validation.builder.setField("messageId").number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const messageRepository = new MessageRepository()
        const editMessageService = new EditMessageService(userRepository, messageRepository)
        return new EditMessageController(editMessageService)
    }
}