import { EditVideoService } from "../../../../application/services"
import { FileSystemAdapter, UuidAdapter } from "../../../../infrastructure/adapters"
import { UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { EditVideoController } from "../../../../presentation/controllers"
import { FileValidation, NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"
import path from 'path'
export const makeEditVideoValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['id']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    validations.push(new FileValidation('thumbnail', 5000, ["image/jpeg", "image/png", "image/gif"]))
    validations.push(new StringValidation('title', 3, 30))
    validations.push(new StringValidation('description', 5, 200))
    return new ValidationComposite(validations)
}

export const makeEditVideoController = () : EditVideoController => {
    const videoRepository = new VideoRepository()
    const userRepository = new UserRepository()
    const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
    const uuidAdapter = new UuidAdapter()
    const editVideoService = new EditVideoService(videoRepository, userRepository, fileSystemAdapter, uuidAdapter)
    return new EditVideoController(makeEditVideoValidation(), editVideoService)
}