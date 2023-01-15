import { GetSubscriptionsVideosService } from "../../../../application/services"
import { SubscriptionRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetSubscriptionsVideosController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetSubscriptionsVideosFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('page').number().min(1).getError(),
            this.validation.builder.setField('rows').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const subscriptionRepository = new SubscriptionRepository()
        const videoRepository = new VideoRepository()
        const getSubscriptionVideosService = new GetSubscriptionsVideosService(subscriptionRepository, videoRepository)
        return new GetSubscriptionsVideosController(getSubscriptionVideosService)
    }
}