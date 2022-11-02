import { InvalidParamError } from "../errors";
import { Validation } from "./validation";

export class BooleanValidation implements Validation{
    constructor(private readonly fieldname : string){}

    validate(input: any): Error | null {
        if(!(typeof input[this.fieldname] === "boolean"))
            return new InvalidParamError(this.fieldname)
        return null
    }
}