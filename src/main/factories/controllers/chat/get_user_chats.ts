import { GetUserChatsService } from "../../../../application/services"
import { ChatRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetUserChatsController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetUserChats extends ControllerFactory{  
    validations(): (Error | null)[] {
        return []
    }
    controller(): Controller {
        const chatRepository = new ChatRepository()
        const getUserChatsService = new GetUserChatsService(chatRepository)
        return new GetUserChatsController(getUserChatsService)
    }
}