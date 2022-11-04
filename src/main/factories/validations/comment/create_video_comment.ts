import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeCreateVideoCommentValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['content', 'videoId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('videoId', 1))
    return new ValidationComposite(validations)
}