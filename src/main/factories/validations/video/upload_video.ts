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