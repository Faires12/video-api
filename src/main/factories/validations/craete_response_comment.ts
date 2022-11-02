import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations";

export default function makeCreateResponseCommentValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['content', 'commentId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('commentId', 1))
    return new ValidationComposite(validations)
}