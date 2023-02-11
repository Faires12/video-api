import { ClearChatNotificationsService } from "../../../../application/services";
import { ChatNotificationRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories";
import { ClearChatNotificationsController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/interfaces/http";
import { ControllerFactory } from "../../controller_factory";

export class ClearChatNotificationsFactory extends ControllerFactory{
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('chatNotificationsIds').array("number").getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const chatNotificationRepository = new ChatNotificationRepository()
        const clearChatNotificationsService = new ClearChatNotificationsService(userRepository,  
            chatNotificationRepository)
        return new ClearChatNotificationsController(clearChatNotificationsService)
    }

}