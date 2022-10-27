import { InvalidParamError } from "../errors";
import { Base64Validator, EmailValidator } from "../interfaces/validators";
import { Validation } from "./validation";

export class Base64Validation implements Validation{
    constructor(private readonly fieldname : string, private readonly validator : Base64Validator,
        private readonly isImage: boolean, private readonly maxSize: number){}

    validate(input: any): Error | null {
        const base64 = input[this.fieldname] as string
        if(!this.validator.validateBase64(base64))
            return new InvalidParamError(this.fieldname)
            
        if(this.isImage){
            if(!base64.startsWith("iVBORw0KGg") && !base64.startsWith("/9j/4"))
                return new InvalidParamError(this.fieldname)
        }

        var fileSizeInKiloByte = (base64.length / 4 * 3) / 1000;
        if(fileSizeInKiloByte > this.maxSize)
            return new InvalidParamError(this.fieldname)

        return null
    }
}