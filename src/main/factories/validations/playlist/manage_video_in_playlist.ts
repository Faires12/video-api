import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeManageVideoInPlaylistValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['videoId', 'playlistId']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}