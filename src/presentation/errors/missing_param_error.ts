export class MissingParamError extends Error{
    constructor(fieldname: string){
        super(`MissingParam: ${fieldname}`)
    }
}