import path from 'path'
import { LoginService, RegisterService } from '../../../../application/services'
import { BcryptAdapter, FileSystemAdapter, JwtAdapter, UuidAdapter } from '../../../../infrastructure/adapters'
import { UserRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { RegisterController } from '../../../../presentation/controllers'
import { Controller } from '../../../../presentation/interfaces/http'
import { ControllerFactory } from '../../controller_factory'

export class RegisterFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('email').string().email().getError(),
            this.validation.builder.setField('name').string().minLength(3).maxLength(50).getError(),
            this.validation.builder.setField('password').string().minLength(3).maxLength(50).getError(),
            this.validation.builder.setField('avatar').file().image().maxSize(5).optional().getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const bcryptAdapter = new BcryptAdapter(12)
        const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas", Number(process.env.EXP) || 3600000)
        const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
        const uuidAdapter = new UuidAdapter()
        const registerService = new RegisterService(userRepository, bcryptAdapter, fileSystemAdapter, uuidAdapter)
        const loginService = new LoginService(userRepository, bcryptAdapter, jwtAdapter)
        return new RegisterController(registerService, loginService)
    }
}
