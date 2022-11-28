import { GetSubscriptionsService } from "../../../../application/services"
import { SubscriptionRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import {  GetSubscriptionsController } from "../../../../presentation/controllers"
import { ValidationComposite } from "../../../../presentation/validations"

export const makeGetSubscriptionsController = () : GetSubscriptionsController => {
    const subscriptionRepository = new SubscriptionRepository()
    const userRepository = new UserRepository()
    const getSubscriptionsService = new GetSubscriptionsService(subscriptionRepository, userRepository)
    return new GetSubscriptionsController(new ValidationComposite([]), getSubscriptionsService)
}