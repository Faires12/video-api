import { GetChatNotificationsService } from "../../../../application/services";
import { ChatNotificationRepository } from "../../../../infrastructure/data/typeorm/repositories";
import { GetChatNotificationsController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/interfaces/http";
import { ControllerFactory } from "../../controller_factory";

export class GetChatNotificationsFactory extends ControllerFactory{
    validations(): (Error | null)[] {
        return []
    }
    controller(): Controller {
        const chatNotificationRepository = new ChatNotificationRepository()
        const getChatNotificationsService = new GetChatNotificationsService(chatNotificationRepository)
        return new GetChatNotificationsController(getChatNotificationsService)
    }
}