import { CreateChatNotificationsService } from "../../../../application/services";
import { ChatNotificationRepository, ChatRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories";
import { CreateChatNotificationsController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/interfaces/http";
import { ControllerFactory } from "../../controller_factory"

export class CreateChatNotificationsFactory extends ControllerFactory{
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('chatId').number().min(1).getError(),
            this.validation.builder.setField('messageId').number().min(1).getError(),
            this.validation.builder.setField('excludeUsersEmails').array("string").getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const chatRepository = new ChatRepository()
        const chatNotificationRepository = new ChatNotificationRepository()
        const createChatNotificationsService = new CreateChatNotificationsService(userRepository, 
            chatRepository, chatNotificationRepository)
        return new CreateChatNotificationsController(createChatNotificationsService)
    }

}