import path from 'path'
import { UploadVideoService } from '../../../../application/services'
import { FileSystemAdapter, UuidAdapter } from '../../../../infrastructure/adapters'
import { VideoRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { UploadVideoController } from '../../../../presentation/controllers'
import { FileValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeUploadVideoValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['title', 'video', 'thumbnail']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new FileValidation('video', 100000, ["video/mp4"]))
    validations.push(new FileValidation('thumbnail', 5000, ["image/jpeg", "image/png"]))
    validations.push(new StringValidation('title', 3, 30))
    validations.push(new StringValidation('description', 5, 200))

    return new ValidationComposite(validations)
}

export const makeUploadVideoController = () : UploadVideoController => {
    const videoRepository = new VideoRepository()
    const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
    const uuidAdapter = new UuidAdapter()
    const uploadVideoService = new UploadVideoService(videoRepository, fileSystemAdapter, uuidAdapter)
    return new UploadVideoController(makeUploadVideoValidation(), uploadVideoService)
}