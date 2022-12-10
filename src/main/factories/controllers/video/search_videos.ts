import { SearchVideosService } from "../../../../application/services"
import { VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import {  SearchVideosController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeSearchVideosValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['rows', 'page']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    validations.push(new RequiredFieldValidation('search'))
    validations.push(new StringValidation('search', 1, 50))
    validations.push(new NumberValidation('orderBy', 1))
    return new ValidationComposite(validations)
}

export const makeSearchVideosController = () : SearchVideosController => {
    const videoRepository = new VideoRepository()
    const searchVideosService = new SearchVideosService(videoRepository)
    return new SearchVideosController(makeSearchVideosValidation(), searchVideosService)
}