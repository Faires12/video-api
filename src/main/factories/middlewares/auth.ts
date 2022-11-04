import { GetUserByTokenService } from "../../../application/services"
import { JwtAdapter } from "../../../infrastructure/adapters"
import { UserRepository } from "../../../infrastructure/data/typeorm/repositories"
import { AuthenticationMiddleware, AuthorizationMiddleware } from "../../../presentation/middlewares"
import { makeAuthValidation } from "../validations"

export function makeAuthMiddleware(needAuthorization: boolean) : AuthenticationMiddleware {
    const userRepository = new UserRepository()
    const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas")
    const getUserByTokenService = new GetUserByTokenService(userRepository, jwtAdapter)
    const validations = makeAuthValidation()
    const authMiddleware = new AuthenticationMiddleware(validations, getUserByTokenService)
    if(needAuthorization)
        authMiddleware.linkWith(new AuthorizationMiddleware())
    return authMiddleware
}