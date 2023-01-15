export interface Validator{
    validateEmail(email: string): boolean
    validateJwt(jwt: string) : boolean
}