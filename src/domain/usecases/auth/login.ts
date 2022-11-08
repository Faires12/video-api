export interface LoginInterface{
    email: string, password: string
}

export interface Login{
    login(infos: LoginInterface) : Promise<string>
}