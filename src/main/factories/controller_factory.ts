import { Controller } from "../../presentation/interfaces/http";
import { Validation } from "../../presentation/validations";

export abstract class ControllerFactory {
    protected validation: Validation
    protected ctrl: Controller

    constructor(){
        this.validation = new Validation()
        this.validation.setConfig(() => this.validations())
        this.ctrl = this.controller()
        this.ctrl.setValidation(this.validation)
    }

    abstract validations(): (Error | null)[]
    abstract controller(): Controller

    make() : Controller {      
        return this.ctrl
    }
}