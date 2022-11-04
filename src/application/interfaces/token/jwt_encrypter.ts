export interface JwtEncrypter{
    encrypt(input: any) : Promise<string>
}