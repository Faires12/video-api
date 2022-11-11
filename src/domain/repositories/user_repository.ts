import { User } from "../entities";

export interface CreateUserInterface{
    name: string,
    email: string,
    password: string,
    avatar?: string
}

export interface ChangeSubsCountInterface{
    id: number
    isPositive: boolean
}

export interface UserRepositoryInterface{
    create(user: CreateUserInterface) : Promise<User>
    getById(id: number) : Promise<User | null>
    getByEmail(email: string) : Promise<User | null>
    changeSubsCount(infos: ChangeSubsCountInterface) : Promise<void>
}