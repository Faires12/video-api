import { BooleanValidation, NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../presentation/validations";

export default function makeAddVideoEvaluationValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['isPositive', 'videoId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    
    validations.push(new NumberValidation('videoId', 1))
    validations.push(new BooleanValidation('isPositive'))
    return new ValidationComposite(validations)
}