import { Base64Validator, EmailValidator } from "../../presentation/interfaces/validators";
import validator from "validator";
import { JwtValidator } from "../../presentation/interfaces/validators/jwt_validator";

export class ValidatorAdapter implements EmailValidator, JwtValidator, Base64Validator {
    validateJwt(jwt: string): boolean {
        return validator.isJWT(jwt)
    }

    validateEmail(email: string): boolean {
        return validator.isEmail(email)
    }

    validateBase64(base64: string): boolean {
        return validator.isBase64(base64)
    }
}