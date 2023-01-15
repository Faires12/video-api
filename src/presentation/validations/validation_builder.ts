import { InvalidParamError, MissingParamError } from "../errors"
import {Validator} from "./"

export class ValidationBuilder{
    private readonly ErrorPriorities = {
        REQUIRED: 0,
        FIELDTYPE: 1,
        FIELDPROPERTIES: 2,
        NOPRIORITY: 999
    }

    private input: any
    private field: any
    private fieldname: string
    private error: Error | null = null
    private errorPriority : number = this.ErrorPriorities.NOPRIORITY
    private opc : boolean = false
    private null : boolean = false

    constructor(private readonly validator: Validator,input?: any) {
        if(input)
            this.input = input
    }

    setInput(input: any){
        this.input = input
    }

    private hasProperty(): boolean {
        return this.input.hasOwnProperty(this.fieldname)
    }

    private isString(): boolean {
        return typeof this.field === 'string'
    }

    private isBoolean(): boolean {
        return typeof this.field === 'boolean'
    }

    private isNumber(): boolean {
        return typeof this.field === 'number'
    }

    private isFile(): boolean {
        if(!(typeof this.field === 'object'))
            return false
        return 'name' in this.field && 'data' in this.field && 'size' in this.field  && 'mimetype' in this.field
    }

    private checkExistence(){
        if(!this.hasProperty())
            !this.opc && this.setError(new MissingParamError(this.fieldname), this.ErrorPriorities.REQUIRED)  
        else if(this.field === undefined)
            this.setError(new MissingParamError(this.fieldname), this.ErrorPriorities.REQUIRED)          
        else if(!this.null && this.field === null)
            this.setError(new MissingParamError(this.fieldname), this.ErrorPriorities.REQUIRED)
    }

    private setError(error: Error, errorPriority: number): void {
        if(errorPriority < this.errorPriority){
            this.error = error
            this.errorPriority = errorPriority
        }
    }

    getError() : Error | null {
        this.checkExistence()
        return this.error
    }

    setField(fieldname: string) : this {
        this.field = this.input[fieldname]
        this.fieldname = fieldname
        this.error = null 
        this.errorPriority = this.ErrorPriorities.NOPRIORITY
        return this
    }

    optional() : this {
        this.opc = true
        return this
    }

    nullable() : this {
        this.null = true
        return this
    }

    string() : this {
        if(!this.hasProperty())
            return this
        if(!this.isString())
            this.setError(new InvalidParamError(this.fieldname, 'needs to be a string'), this.ErrorPriorities.FIELDTYPE)
        return this
    }

    email() : this {
        if(!this.hasProperty() || !this.isString())
            return this
        if(!this.validator.validateEmail(this.field))
            this.setError(new InvalidParamError(this.fieldname, 'needs to be an email'), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    jwt() : this {
        if(!this.hasProperty() || !this.isString())
            return this
        if(!this.validator.validateJwt(this.field))
            this.setError(new InvalidParamError(this.fieldname, 'needs to be a jwt'), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    minLength(v: number) : this {
        if(!this.hasProperty() || !this.isString())
            return this
        if(this.field.length < v)
            this.setError(new InvalidParamError(this.fieldname, `need to have at least ${v} characters`), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    maxLength(v: number) : this {
        if(!this.hasProperty() || !this.isString())
            return this
        if(this.field.length > v)
            this.setError(new InvalidParamError(this.fieldname, `need to have max ${v} characters`), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    boolean() : this {
        if(!this.hasProperty())
            return this
        if(!this.isBoolean())
            this.setError(new InvalidParamError(this.fieldname, 'needs to be a boolean'), this.ErrorPriorities.FIELDTYPE)
        return this
    }

    number() : this {
        if(!this.hasProperty())
            return this
        if(!this.isNumber())
            this.setError(new InvalidParamError(this.fieldname, 'needs to be a number'), this.ErrorPriorities.FIELDTYPE)
        return this
    }

    min(v: number) : this {
        if(!this.hasProperty() || !this.isNumber())
            return this
        if(this.field < v)
            this.setError(new InvalidParamError(this.fieldname, `need to be at least ${v}`), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    max(v: number) : this {
        if(!this.hasProperty() || !this.isNumber())
            return this
        if(this.field > v)
            this.setError(new InvalidParamError(this.fieldname, `need to be at max ${v}`), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    file() : this {
        if(!this.hasProperty())
            return this
        if(!this.isFile())
            this.setError(new InvalidParamError(this.fieldname, 'needs to be a file'), this.ErrorPriorities.FIELDTYPE)
        return this
    }

    maxSize(v: number) : this {
        if(!this.hasProperty() || !this.isFile())
            return this
        if(this.field.size / 1000000 > v)
            this.setError(new InvalidParamError(this.fieldname, `needs to have max ${v}mb`), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    image() : this {
        if(!this.hasProperty() || !this.isFile())
            return this
        if(!["image/jpeg", "image/png", "image/gif"].includes(this.field.mimetype))
            this.setError(new InvalidParamError(this.fieldname, `needs to be an image`), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    video() : this {
        if(!this.hasProperty() || !this.isFile())
            return this
        if(!["video/mp4"].includes(this.field.mimetype))
            this.setError(new InvalidParamError(this.fieldname, `needs to be a video`), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }
}