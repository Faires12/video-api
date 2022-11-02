import { MissingParamError } from "../errors";
import { Validation } from "./validation";

export class RequiredFieldValidation implements Validation{
    constructor(private readonly fieldname: string) {}

    validate(input: any): Error | null {
        if(input[this.fieldname] === undefined)
            return new MissingParamError(this.fieldname)
        return null
    }
}