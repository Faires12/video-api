import { InvalidParamError } from "../errors";
import { Validation } from "./validation";

export class NumberValidation implements Validation{
    constructor(private readonly fieldname : string, private readonly min?: number, private readonly max?: number){}

    validate(input: any): Error | null {
        if(!input.hasOwnProperty(this.fieldname))
            return null
        if(isNaN(input[this.fieldname]))
            return new InvalidParamError(this.fieldname)
        if(this.min && (input[this.fieldname] < this.min))
            return new InvalidParamError(this.fieldname)
        if(this.max && (input[this.fieldname] > this.max))
            return new InvalidParamError(this.fieldname)
        return null
    }
}