import { CreateMessageService } from "../../../../application/services"
import { FileSystemAdapter, UuidAdapter } from "../../../../infrastructure/adapters"
import { ChatRepository, MessageRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateMessageController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"
import path from 'path'

export class CreateMessageFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField("content").string().minLength(1).maxLength(250).getError(),
            this.validation.builder.setField("chatId").number().min(1).getError(),
            this.validation.builder.setField("file").string().base64().chat_base64().maxSizeBase64(5).optional().getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const chatRepository = new ChatRepository()
        const messageRepository = new MessageRepository()
        const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
        const uuidAdapter = new UuidAdapter()
        const createMessageService = new CreateMessageService(userRepository, chatRepository, messageRepository, fileSystemAdapter, uuidAdapter)
        return new CreateMessageController(createMessageService)
    }
}