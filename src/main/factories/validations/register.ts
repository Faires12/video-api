import { ValidatorAdapter } from "../../../infrastructure/adapters/validator_adapter";
import { EmailValidation, FileValidation, MinLengthValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations";

export default function makeRegisterValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['email', 'name', 'password']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    for(const fieldname of ['password', 'name']){
        validations.push(new MinLengthValidation(fieldname, 3))
    }
    validations.push(new FileValidation('avatar', 5000, ["image/jpeg", "image/png"], true))

    return new ValidationComposite(validations)
}