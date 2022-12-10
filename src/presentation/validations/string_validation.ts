import { InvalidParamError } from "../errors";
import { Validation } from "./validation";

export class StringValidation implements Validation{
    constructor(private readonly fieldname: string, private readonly minLength: number, private readonly maxLength: number) {}

    validate(input: any): Error | null {
        if(!input.hasOwnProperty(this.fieldname))
            return null
        if(!(typeof input[this.fieldname] === 'string'))
            return new InvalidParamError(this.fieldname)
        if(input[this.fieldname].length < this.minLength)
            return new InvalidParamError(this.fieldname)
        if(input[this.fieldname].length > this.maxLength)
            return new InvalidParamError(this.fieldname)
        return null
    }
    
}