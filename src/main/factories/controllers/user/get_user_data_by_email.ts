import { GetUserDataByEmailService } from "../../../../application/services"
import { ValidatorAdapter } from "../../../../infrastructure/adapters"
import { UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetUserDataByEmailController } from "../../../../presentation/controllers"
import { EmailValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetUserDataByEmailValidation = () : Validation => {
    const validations : Validation[] = []
    validations.push(new RequiredFieldValidation('email'))
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}

export const makeGetUserDataByEmailController = () : GetUserDataByEmailController => {
    const userRepository = new UserRepository()
    const getUserDatabyEmailService = new GetUserDataByEmailService(userRepository)
    return new GetUserDataByEmailController(makeGetUserDataByEmailValidation(), getUserDatabyEmailService)
}