import { GetUserVideosService } from "../../../../application/services"
import { ValidatorAdapter } from "../../../../infrastructure/adapters"
import { UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetUserVideosController } from "../../../../presentation/controllers"
import { EmailValidation, NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetUserVideosValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['rows', 'page']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    validations.push(new RequiredFieldValidation('email'))
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    validations.push(new NumberValidation('orderBy', 1))
    return new ValidationComposite(validations)
}

export const makeGetUserVideosController = () : GetUserVideosController => {
    const videoRepository = new VideoRepository()
    const userRepository = new UserRepository()
    const getUserVideosService = new GetUserVideosService(videoRepository, userRepository)
    return new GetUserVideosController(makeGetUserVideosValidation(), getUserVideosService)
}