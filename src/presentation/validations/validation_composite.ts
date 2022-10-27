import { Validation } from "./validation";

export class ValidationComposite implements Validation {
    constructor(private readonly validations: Validation[]) {}

    validate(input: any): Error | null {
        let error : Error | null = null

        for(const validation of this.validations){
            error = validation.validate(input)
            if(error)
                break
        }
        
        return error
    }
    
}