import { ValidatorAdapter } from "../../../infrastructure/adapters/validator_adapter";
import { EmailValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations";

export default function makeLoginValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['email', 'password']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new EmailValidation('email', new ValidatorAdapter()))

    return new ValidationComposite(validations)
}