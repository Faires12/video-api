import bcrypt from 'bcrypt'
import { Encrypter, HashComparer } from '../../application/interfaces'


export class BcryptAdapter implements Encrypter, HashComparer{
    constructor(private readonly salt : number){}

    async encrypt(input: string): Promise<string> {
        return await bcrypt.hash(input, this.salt)
    }

    async compare(hashedInput: string, input: string): Promise<boolean> {
        return await bcrypt.compare(input, hashedInput)
    }
    
}