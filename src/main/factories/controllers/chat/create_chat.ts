import { CreateChatService } from "../../../../application/services"
import { FileSystemAdapter, UuidAdapter } from "../../../../infrastructure/adapters"
import { ChatRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateChatController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"
import path from 'path'

export class CreateChatFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('isPersonal').boolean().getError(),
            this.validation.builder.setField('otherUsersEmails').array("string").getError(),
            this.validation.builder.setField("groupName").string().minLength(3).maxLength(50).optional().getError(),
            this.validation.builder.setField("groupImage").string().base64().image_base64().maxSize(5).optional().getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const chatRepository = new ChatRepository()
        const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
        const uuidAdapter = new UuidAdapter()
        const createChatService = new CreateChatService(userRepository, chatRepository, fileSystemAdapter, uuidAdapter)
        return new CreateChatController(createChatService)
    }
}