export class InvalidParamError extends Error{
    constructor(fieldname: string, description?: string){
        let message = `InvalidParam: ${fieldname}`
        if(description)
            message += `; ${description}`
        super(message)
    }
}