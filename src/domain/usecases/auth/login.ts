export interface Login{
    login(email: string, password: string) : Promise<string | null>
}