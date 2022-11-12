import { InvalidParamError, MissingParamError } from "../errors";
import { Validation } from "./validation";

export class RequiredFieldValidation implements Validation{
    constructor(private readonly fieldname: string, private readonly nulleable?: boolean) {}

    validate(input: any): Error | null {
        if(typeof input[this.fieldname] === "boolean")
            return null
        if(!input[this.fieldname])
            return new MissingParamError(this.fieldname)
        return null
    }
}