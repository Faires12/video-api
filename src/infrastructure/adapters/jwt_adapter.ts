import jwt from 'jsonwebtoken'
import { JwtDecrypter, JwtEncrypter } from '../../application/interfaces'

export class JwtAdapter implements JwtEncrypter, JwtDecrypter{
    constructor(private readonly secret : string, private readonly expTime: number){}
    
    async encrypt(input: any): Promise<string> {
        return await jwt.sign(input, this.secret, {
            expiresIn: this.expTime
        })
    }
    
    async decrypt(token: string): Promise<any> {
        return await jwt.verify(token, this.secret)
    }
}