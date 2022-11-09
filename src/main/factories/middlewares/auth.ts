import { GetUserByTokenService } from "../../../application/services"
import { JwtAdapter, ValidatorAdapter } from "../../../infrastructure/adapters"
import { UserRepository } from "../../../infrastructure/data/typeorm/repositories"
import { AuthenticationMiddleware, AuthorizationMiddleware } from "../../../presentation/middlewares"
import { JwtValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations"


export function makeAuthValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['token']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new JwtValidation('token', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}

export function makeAuthMiddleware(needAuthorization: boolean) : AuthenticationMiddleware {
    const userRepository = new UserRepository()
    const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas")
    const getUserByTokenService = new GetUserByTokenService(userRepository, jwtAdapter)
    const validations = makeAuthValidation()
    const authMiddleware = new AuthenticationMiddleware(validations, getUserByTokenService)
    if(needAuthorization)
        authMiddleware.linkWith(new AuthorizationMiddleware(userRepository))
    return authMiddleware
}