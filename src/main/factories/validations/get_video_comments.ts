import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations";

export const makeGetVideoCommentsValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['videoId', 'page', 'rows']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}