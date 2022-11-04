import { ValidatorAdapter } from "../../../../infrastructure/adapters"
import { EmailValidation, FileValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"


export function makeRegisterValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['email', 'name', 'password']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    for(const fieldname of ['password', 'name']){
        validations.push(new StringValidation(fieldname, 3))
    }
    validations.push(new FileValidation('avatar', 5000, ["image/jpeg", "image/png"], true))

    return new ValidationComposite(validations)
}