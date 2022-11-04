import { BooleanValidation, NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeAddCommentvaluationValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['isPositive', 'commentId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('commentId', 1))
    validations.push(new BooleanValidation('isPositive'))
    return new ValidationComposite(validations)
}