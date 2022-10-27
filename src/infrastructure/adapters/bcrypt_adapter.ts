import { Encrypter } from "../../application/interfaces/encrypter";
import bcrypt from 'bcrypt'
import { Decrypter } from "../../application/interfaces/decrypter";

export class BcryptAdapter implements Encrypter, Decrypter{
    constructor(private readonly salt : number){}

    async encrypt(input: string): Promise<string> {
        return await bcrypt.hash(input, this.salt)
    }

    async decrypt(hashedInput: string, input: string): Promise<boolean> {
        return await bcrypt.compare(input, hashedInput)
    }
    
}