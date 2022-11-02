import { InvalidParamError } from "../errors";
import { Validation } from "./validation";

export class StringValidation implements Validation{
    constructor(private readonly fieldname: string, private readonly minLength: number) {}

    validate(input: any): Error | null {
        if(input[this.fieldname].length < this.minLength)
            return new InvalidParamError(this.fieldname)
        return null
    }
    
}