import { ValidatorAdapter } from "../../../../infrastructure/adapters";
import { JwtValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations";

export function makeAuthValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['token']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new JwtValidation('token', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}