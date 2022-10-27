import { JwtEncrypter } from "../../application/interfaces/jwt_encrypter";
import jwt from 'jsonwebtoken'
import { JwtDecrypter } from "../../application/interfaces/jwt_decrypter";

export class JwtAdapter implements JwtEncrypter, JwtDecrypter{
    constructor(private readonly secret : string){}
    
    async encrypt(input: any): Promise<string> {
        return await jwt.sign(input, this.secret)
    }
    
    async decrypt(token: string): Promise<any> {
        return await jwt.verify(token, this.secret)
    }
}