import { LoginService } from "../../../application/services/login_service";
import { RegisterService } from "../../../application/services/register_service";
import { BcryptAdapter } from "../../../infrastructure/adapters/bcrypt_adapter";
import { FileSystemAdapter } from "../../../infrastructure/adapters/file_system_adapter";
import { JwtAdapter } from "../../../infrastructure/adapters/jwt_adapter";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid_adapter";
import { UserRepository } from "../../../infrastructure/data/typeorm/repositories/user_repository";
import { RegisterController } from "../../../presentation/controllers/auth/register_controller";
import makeRegisterValidation from "../validations/register";
import path from 'path'

export default function makeRegisterController() : RegisterController {
    const userRepository = new UserRepository()
    const bcryptAdapter = new BcryptAdapter(12)
    const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas")
    const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../public/"))
    const uuidAdapter = new UuidAdapter()
    const registerService = new RegisterService(userRepository, bcryptAdapter, fileSystemAdapter, uuidAdapter)
    const loginService = new LoginService(userRepository, bcryptAdapter, jwtAdapter)
    const validations = makeRegisterValidation()
    return new RegisterController(validations, registerService, loginService)
}