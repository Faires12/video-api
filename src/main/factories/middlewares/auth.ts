import { GetUserByTokenService } from "../../../application/services/get_user_by_token_service";
import { JwtAdapter } from "../../../infrastructure/adapters/jwt_adapter";
import { UserRepository } from "../../../infrastructure/data/typeorm/repositories/user_repository";
import { AuthenticationMiddleware } from "../../../presentation/middlewares/authentication_middleware";
import makeAuthValidation from "../validations/auth";

export default function makeAuthMiddleware() : AuthenticationMiddleware {
    const userRepository = new UserRepository()
    const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas")
    const getUserByTokenService = new GetUserByTokenService(userRepository, jwtAdapter)
    const validations = makeAuthValidation()
    return new AuthenticationMiddleware(validations, getUserByTokenService)
}