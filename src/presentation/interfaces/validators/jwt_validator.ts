export interface JwtValidator{
    validateJwt(jwt: string) : boolean
}