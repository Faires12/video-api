import { BooleanValidation, NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeCreatePlaylistValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['title']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('videoId', 1, undefined))
    validations.push(new StringValidation('title', 3, 20))
    validations.push(new StringValidation('description', 5, 50))
    return new ValidationComposite(validations)
}