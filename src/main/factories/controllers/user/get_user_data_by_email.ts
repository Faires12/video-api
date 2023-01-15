import { GetUserDataByEmailService } from "../../../../application/services"
import { UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetUserDataByEmailController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetUserDataByEmailFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('email').string().email().getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const getUserDatabyEmailService = new GetUserDataByEmailService(userRepository)
        return new GetUserDataByEmailController(getUserDatabyEmailService)
    }
}