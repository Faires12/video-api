import { InvalidParamError } from "../errors";
import { Validation } from "./validation";

export class NumberValidation implements Validation{
    constructor(private readonly fieldname : string){}

    validate(input: any): Error | null {
        if(isNaN(input[this.fieldname]))
            return new InvalidParamError(this.fieldname)
        return null
    }
}