import { InvalidParamError, MissingParamError } from "../errors"
import validator from "validator"

export class ValidationBuilder{
    private field: any
    private fieldname: string
    private error: Error | null = null
    private errorPriority : number = 999

    private readonly ErrorPriorities = {
        REQUIRED: 0,
        FIELDTYPE: 1,
        FIELDPROPERTIES: 2
    }

    constructor(private readonly input: any) {}

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
        return 'name' in this.field && 'data' in this.field && 'size' in this.field  && 'mimetype' in this.field
    }

    private setError(error: Error, errorPriority: number): void {
        if(errorPriority < this.errorPriority){
            this.error = error
            this.errorPriority = errorPriority
        }
    }

    getError() : Error | null {
        return this.error
    }

    setField(fieldname: string) : this {
        this.field = this.input[fieldname]
        this.fieldname = fieldname
        return this
    }

    required(nullable?: boolean) : this {
        if(!this.hasProperty())
            this.setError(new MissingParamError(this.fieldname), this.ErrorPriorities.REQUIRED)
        if(this.field === undefined)
            this.setError(new MissingParamError(this.fieldname), this.ErrorPriorities.REQUIRED)
        if(!nullable && this.field === null)
            this.setError(new MissingParamError(this.fieldname), this.ErrorPriorities.REQUIRED)
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
        if(!validator.isEmail(this.field))
            this.setError(new InvalidParamError(this.fieldname, 'needs to be an email'), this.ErrorPriorities.FIELDPROPERTIES)
        return this
    }

    jwt() : this {
        if(!this.hasProperty() || !this.isString())
            return this
        if(!validator.isJWT(this.field))
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
        if(this.field.size > v)
            this.setError(new InvalidParamError(this.fieldname, `needs to have max ${v/1000}mb`), this.ErrorPriorities.FIELDPROPERTIES)
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