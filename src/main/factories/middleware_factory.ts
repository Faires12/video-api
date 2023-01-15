import { Middleware } from "../../presentation/interfaces/http";
import { Validation } from "../../presentation/validations";

export abstract class MiddlewareFactory {
    protected validation: Validation
    protected mid: Middleware

    constructor(optional?: boolean, middlewareList?: Middleware[]){
        this.validation = new Validation()
        this.validation.setConfig(() => this.validations(optional))
        this.mid = this.middleware()
        this.mid.setValidation(this.validation)
        optional && this.mid.setOptional(optional)
        if(middlewareList){
            middlewareList.unshift(this.mid)
            for(let i = 0; i < middlewareList.length; i++){
                if(!middlewareList[i+1])
                    break
                middlewareList[i].linkWith(middlewareList[i+1])
            }
        }
    }

    abstract validations(optional?: boolean): (Error | null)[]
    abstract middleware(): Middleware

    make(): Middleware { 
        return this.mid
    }
}