import path from 'path'
import { EditUserService } from '../../../../application/services'
import { FileSystemAdapter, UuidAdapter } from '../../../../infrastructure/adapters'
import { UserRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { EditUserController } from '../../../../presentation/controllers'
import { FileValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeEditUserValidation() : Validation {
    const validations : Validation[] = []
    validations.push(new StringValidation('name', 3, 50))
    validations.push(new FileValidation('avatar', 5000, ["image/jpeg", "image/png", "image/gif"]))
    return new ValidationComposite(validations)
}

export function makeEditUserController() : EditUserController {
    const userRepository = new UserRepository()
    const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
    const uuidAdapter = new UuidAdapter()
    const editUserService = new EditUserService(userRepository, fileSystemAdapter, uuidAdapter)
    return new EditUserController(makeEditUserValidation(), editUserService)
}