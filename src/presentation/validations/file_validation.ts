import { InvalidParamError } from "../errors";
import { Validation } from "./validation";

export class FileValidation implements Validation{
    constructor(private readonly fieldname: string, private readonly maxSize: number, private readonly mimeTypes: string[],
        private readonly optional?: boolean) {}

    validate(input: any): Error | null {
        
        if(this.optional && !input[this.fieldname])
            return null
        if(input[this.fieldname].size / 1000 > this.maxSize)
            return new InvalidParamError(this.fieldname)
        if(!this.mimeTypes.includes(input[this.fieldname].mimetype))
            return new InvalidParamError(this.fieldname)
        
        return null
    }
    
}