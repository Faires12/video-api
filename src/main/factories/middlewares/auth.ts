import { GetUserByTokenService } from "../../../application/services"
import { JwtAdapter, ValidatorAdapter } from "../../../infrastructure/adapters"
import { UserRepository } from "../../../infrastructure/data/typeorm/repositories"
import { AuthenticationMiddleware, AuthorizationMiddleware } from "../../../presentation/middlewares"
import { JwtValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations"


export function makeAuthValidation(optional?: boolean) : Validation {
    const validations : Validation[] = []
    if(!optional)
        validations.push(new RequiredFieldValidation('token'))
    validations.push(new JwtValidation('token', new ValidatorAdapter()))
    return new ValidationComposite(validations)
}

export function makeAuthMiddleware(needAuthorization: boolean, optional?: boolean) : AuthenticationMiddleware {
    const userRepository = new UserRepository()
    const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas", Number(process.env.EXP) || 3600000)
    const getUserByTokenService = new GetUserByTokenService(userRepository, jwtAdapter)
    const validations = makeAuthValidation(optional)
    const authMiddleware = new AuthenticationMiddleware(validations, getUserByTokenService, optional)
    if(needAuthorization)
        authMiddleware.linkWith(new AuthorizationMiddleware(userRepository))
    return authMiddleware
}