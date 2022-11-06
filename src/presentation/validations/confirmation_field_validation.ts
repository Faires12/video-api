import { InvalidParamError, MissingParamError } from "../errors";
import { Validation } from "./validation";

export class ConfirmationFieldValidation implements Validation{
    constructor(private readonly fieldname: string, private readonly fieldname2: string) {}

    validate(input: any): Error | null {
        if(input[this.fieldname] !== input[this.fieldname2])
            return new InvalidParamError(this.fieldname2, `${this.fieldname} need to be equals ${this.fieldname2}`)
        return null
    }
}