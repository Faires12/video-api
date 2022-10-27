export class InvalidParamError extends Error{
    constructor(fieldname: string){
        super(`InvalidParam: ${fieldname}`)
    }
}