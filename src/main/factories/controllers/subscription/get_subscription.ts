import { GetSubscriptionService } from "../../../../application/services"
import { SubscriptionRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetSubscriptionController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetSubscriptionFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('subscribeTo').string().email().getError(),
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const subscriptionRepository = new SubscriptionRepository()
        const getSubscriptionService = new GetSubscriptionService(userRepository, subscriptionRepository)
        return new GetSubscriptionController(getSubscriptionService)
    }
}