import { ValidatorAdapter } from "../../../infrastructure/adapters/validator_adapter";
import { JwtValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations";

export default function makeAuthValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['token']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new JwtValidation('token', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}