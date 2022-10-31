import { User } from "../entities/user";

export interface CreateUserInterface{
    name: string,
    email: string,
    password: string,
    avatar?: string
}

export interface UserRepositoryInterface{
    create(user: CreateUserInterface) : Promise<User>
    update(user: User) : Promise<User>
    getAll() : Promise<User[]>
    getById(id: number) : Promise<User | null>
    getByEmail(email: string) : Promise<User | null>
    delete(id: number) : Promise<User>
}