import { InvalidParamError, MissingParamError } from "../errors";
import { Validation } from "./validation";

export class RequiredFieldValidation implements Validation{
    constructor(private readonly fieldname: string, private readonly nulleable?: boolean) {}

    validate(input: any): Error | null {
        if(input[this.fieldname] === undefined)
            return new MissingParamError(this.fieldname)
        if(!this.nulleable && input[this.fieldname] === null)
            return new InvalidParamError(this.fieldname)
        return null
    }
}