import { CreateChatService } from "../../../../application/services"
import { ChatRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateChatController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class CreateChatFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('isPersonal').boolean().getError(),
            this.validation.builder.setField('otherUsersEmails').array("string").getError(),
            this.validation.builder.setField("groupName").string().minLength(3).maxLength(50).optional().getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const chatRepository = new ChatRepository()
        const createChatService = new CreateChatService(userRepository, chatRepository)
        return new CreateChatController(createChatService)
    }
}