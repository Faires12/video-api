import { InvalidParamError } from "../errors";
import { JwtValidator } from "../interfaces/validators";
import { Validation } from "./validation";

export class JwtValidation implements Validation{
    constructor(private readonly fieldname : string, private readonly validator : JwtValidator){}

    validate(input: any): Error | null {
        if(!input[this.fieldname])
            return null
        if(!this.validator.validateJwt(input[this.fieldname]))
            return new InvalidParamError(this.fieldname)
        return null
    }
}