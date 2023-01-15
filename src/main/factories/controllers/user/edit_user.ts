import path from 'path'
import { EditUserService } from '../../../../application/services'
import { FileSystemAdapter, UuidAdapter } from '../../../../infrastructure/adapters'
import { UserRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { EditUserController } from '../../../../presentation/controllers'
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class EditUserFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('name').string().minLength(3).maxLength(50).optional().getError(),
            this.validation.builder.setField('avatar').file().maxSize(5).image().getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
        const uuidAdapter = new UuidAdapter()
        const editUserService = new EditUserService(userRepository, fileSystemAdapter, uuidAdapter)
        return new EditUserController(editUserService)
    }
}