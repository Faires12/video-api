import { GetSubscriptionService } from "../../../../application/services"
import { ValidatorAdapter } from "../../../../infrastructure/adapters"
import { SubscriptionRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetSubscriptionController } from "../../../../presentation/controllers"
import { EmailValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetSubscriptionValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['subscribeTo']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new EmailValidation(fieldname, new ValidatorAdapter()))
    }
    return new ValidationComposite(validations)
}

export const makeGetSubscriptionController = () : GetSubscriptionController => {
    const userRepository = new UserRepository()
    const subscriptionRepository = new SubscriptionRepository()
    const getSubscriptionService = new GetSubscriptionService(userRepository, subscriptionRepository)
    return new GetSubscriptionController(makeGetSubscriptionValidation(), getSubscriptionService)
}