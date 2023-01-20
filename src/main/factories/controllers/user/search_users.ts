import { SearchUsersService } from "../../../../application/services"
import { UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { SearchUsersController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class SearchUsersFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('page').number().min(1).getError(),
            this.validation.builder.setField('rows').number().min(1).getError(),
            this.validation.builder.setField('search').string().minLength(1).maxLength(50).getError(),
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const searchUsersFactory = new SearchUsersService(userRepository)
        return new SearchUsersController(searchUsersFactory)
    }
}