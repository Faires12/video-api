import { GetSubscriptionsService } from "../../../../application/services"
import { SubscriptionRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import {  GetSubscriptionsController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetSubscriptionsFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return []
    }
    controller(): Controller {
        const subscriptionRepository = new SubscriptionRepository()
        const userRepository = new UserRepository()
        const getSubscriptionsService = new GetSubscriptionsService(subscriptionRepository, userRepository)
        return new GetSubscriptionsController(getSubscriptionsService)
    }
}
