import { ValidatorAdapter } from "../../../../infrastructure/adapters"
import { EmailValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"


export function makeLoginValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['email', 'password']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    validations.push(new StringValidation('password', 3, 50))
    
    return new ValidationComposite(validations)
}