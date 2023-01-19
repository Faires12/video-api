export interface Validator{
    validateEmail(email: string): boolean
    validateJwt(jwt: string): boolean
    validateBase64(base64: string): boolean
}