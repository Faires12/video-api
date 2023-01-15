import { GetLoggedUserDataService } from "../../../../application/services"
import { UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetLoggedUserDataController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetLoggedUserDataFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return []
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const getLoggedUserDataService = new GetLoggedUserDataService(userRepository)
        return new GetLoggedUserDataController(getLoggedUserDataService)
    }
}