import { ValidatorAdapter } from "../../infrastructure/adapters"
import { ValidationBuilder } from "./"

export class Validation {
    public builder : ValidationBuilder = new ValidationBuilder(new ValidatorAdapter())
    builderConfig: () => (Error | null)[] 

    validate(input: any) : Error | null {
        this.builder.setInput(input)
        const errors = this.builderConfig()
        for(const error of errors){
            if(error) return error
        }
        return null
    }

    setConfig(cb: () => (Error | null)[]){
        this.builderConfig = cb
    }
}