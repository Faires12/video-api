export interface Encrypter{
    encrypt(input: string): Promise<string>
}