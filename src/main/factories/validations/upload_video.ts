import { FileValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations"

export default function makeUploadVideoValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['title', 'video', 'thumbnail']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new FileValidation('video', 100000, ["video/mp4"]))
    validations.push(new FileValidation('thumbnail', 5000, ["image/jpeg", "image/png"]))

    return new ValidationComposite(validations)
}