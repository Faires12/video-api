import { ValidatorAdapter } from "../../../../infrastructure/adapters"
import { EmailValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"


export function makeLoginValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['email', 'password']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new EmailValidation('email', new ValidatorAdapter()))

    return new ValidationComposite(validations)
}