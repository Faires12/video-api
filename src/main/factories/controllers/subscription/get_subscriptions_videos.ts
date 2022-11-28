import { GetSubscriptionsVideosService } from "../../../../application/services"
import { SubscriptionRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetSubscriptionsVideosController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetSubscriptionsVideosValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['page', 'rows']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeGetSubscriptionsVideosController = () : GetSubscriptionsVideosController => {
    const subscriptionRepository = new SubscriptionRepository()
    const videoRepository = new VideoRepository()
    const getSubscriptionVideosService = new GetSubscriptionsVideosService(subscriptionRepository, videoRepository)
    return new GetSubscriptionsVideosController(makeGetSubscriptionsVideosValidation(), getSubscriptionVideosService)
}