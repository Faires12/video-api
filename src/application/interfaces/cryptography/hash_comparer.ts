export interface HashComparer{
    compare(hashedInput: string, input: string): Promise<boolean>
}