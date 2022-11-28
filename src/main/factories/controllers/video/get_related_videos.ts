import { GetRelatedVideosService } from "../../../../application/services"
import { UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetRelatedVideosController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetRelatedVideosValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['rows', 'page', 'videoId']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeGetRelatedVideosController = () : GetRelatedVideosController => {
    const videoRepository = new VideoRepository()
    const userRepository = new UserRepository()
    const getRelatedVideosService = new GetRelatedVideosService(videoRepository, userRepository)
    return new GetRelatedVideosController(makeGetRelatedVideosValidation(), getRelatedVideosService)
}