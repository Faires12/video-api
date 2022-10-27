import { LoginService } from "../../../application/services/login_service";
import { BcryptAdapter } from "../../../infrastructure/adapters/bcrypt_adapter";
import { JwtAdapter } from "../../../infrastructure/adapters/jwt_adapter";
import { UserRepository } from "../../../infrastructure/data/typeorm/repositories/user_repository";
import { LoginController } from "../../../presentation/controllers/auth/login_controller";
import makeLoginValidation from "../validations/login";

export default function makeLoginController() : LoginController {
    const userRepository = new UserRepository()
    const bcryptAdapter = new BcryptAdapter(12)
    const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas")
    const loginService = new LoginService(userRepository, bcryptAdapter, jwtAdapter)
    const validations = makeLoginValidation()
    return new LoginController(validations, loginService)
}