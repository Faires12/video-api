import validator from "validator";
import { Validator } from "../../presentation/validations";

export class ValidatorAdapter implements Validator {
    validateBase64(base64: string): boolean {
        const content = base64.split(',').pop()
        if(!content)
            return false
        return validator.isBase64(content)
    }

    validateJwt(jwt: string): boolean {
        return validator.isJWT(jwt)
    }

    validateEmail(email: string): boolean {
        return validator.isEmail(email)
    }
}