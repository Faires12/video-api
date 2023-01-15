import { ManageSubscriptionService } from "../../../../application/services"
import { SubscriptionRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { ManageSubscriptionController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class ManageSubscriptionFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('subscribeTo').string().email().getError(),
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const subscriptionRepository = new SubscriptionRepository()
        const manageSubscriptionService = new ManageSubscriptionService(userRepository, subscriptionRepository)
        return new ManageSubscriptionController(manageSubscriptionService)
    }
}
