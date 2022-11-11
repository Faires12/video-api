import { GetLoggedUserDataService } from "../../../../application/services"
import { UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetLoggedUserDataController } from "../../../../presentation/controllers"
import { ValidationComposite } from "../../../../presentation/validations"

export const makeGetLoggedUserDataController = () : GetLoggedUserDataController => {
    const userRepository = new UserRepository()
    const getLoggedUserDataService = new GetLoggedUserDataService(userRepository)
    return new GetLoggedUserDataController(new ValidationComposite([]), getLoggedUserDataService)
}