import path from 'path'
import { LoginService, RegisterService } from '../../../../application/services'
import { BcryptAdapter, FileSystemAdapter, JwtAdapter, UuidAdapter } from '../../../../infrastructure/adapters'
import { UserRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { RegisterController } from '../../../../presentation/controllers'
import {makeRegisterValidation} from '../../validations'

export function makeRegisterController() : RegisterController {
    const userRepository = new UserRepository()
    const bcryptAdapter = new BcryptAdapter(12)
    const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas")
    const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
    const uuidAdapter = new UuidAdapter()
    const registerService = new RegisterService(userRepository, bcryptAdapter, fileSystemAdapter, uuidAdapter)
    const loginService = new LoginService(userRepository, bcryptAdapter, jwtAdapter)
    const validations = makeRegisterValidation()
    return new RegisterController(validations, registerService, loginService)
}