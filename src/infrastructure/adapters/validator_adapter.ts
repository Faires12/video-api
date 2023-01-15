import validator from "validator";
import { Validator } from "../../presentation/validations";

export class ValidatorAdapter implements Validator {
    validateJwt(jwt: string): boolean {
        return validator.isJWT(jwt)
    }

    validateEmail(email: string): boolean {
        return validator.isEmail(email)
    }
}