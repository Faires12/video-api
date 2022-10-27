export interface Decrypter{
    decrypt(hashedInput: string, input: string): Promise<boolean>
}