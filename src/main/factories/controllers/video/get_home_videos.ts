import { GetHomeVideosService } from "../../../../application/services"
import { VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetHomeVideosController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetHomeVideosValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['rows', 'page']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeGetHomeVideosController = () : GetHomeVideosController => {
    const videoRepository = new VideoRepository()
    const getHomeVideosService = new GetHomeVideosService(videoRepository)
    return new GetHomeVideosController(makeGetHomeVideosValidation(), getHomeVideosService)
}