import { NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeCreateResponseCommentValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['content', 'commentId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new StringValidation('content', 5, 200))
    validations.push(new NumberValidation('commentId', 1))
    return new ValidationComposite(validations)
}