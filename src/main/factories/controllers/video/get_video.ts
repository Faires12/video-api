import { GetVideoService } from "../../../../application/services"
import { VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetVideoController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetVideoValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['id']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeGetVideoController = () : GetVideoController => {
    const videoRepository = new VideoRepository()
    const getVideoService = new GetVideoService(videoRepository)
    return new GetVideoController(makeGetVideoValidation(), getVideoService)
}