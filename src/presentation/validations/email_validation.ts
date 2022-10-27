import { InvalidParamError } from "../errors";
import { EmailValidator } from "../interfaces/validators";
import { Validation } from "./validation";

export class EmailValidation implements Validation{
    constructor(private readonly fieldname : string, private readonly validator : EmailValidator){}

    validate(input: any): Error | null {
        if(!this.validator.validateEmail(input[this.fieldname]))
            return new InvalidParamError(this.fieldname)
        return null
    }
}