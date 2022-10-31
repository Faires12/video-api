import { User } from "../../../../domain/entities/user";
import { CreateUserInterface, UserRepositoryInterface } from "../../../../domain/repositories/user_repository";
import {UserEntity} from '../entities/user'


export class UserRepository implements UserRepositoryInterface{
    async create(user: CreateUserInterface): Promise<User> {
        const userEntity = new UserEntity()
        if(user.email && user.name && user.password){
            userEntity.email = user.email
            userEntity.name = user.name
            userEntity.password = user.password   
        }       
        if(user.avatar)
            userEntity.avatar = user.avatar
        await userEntity.save()
        return userEntity
    }
    
    update(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async getById(id: number): Promise<User | null> {
        const user = await UserEntity.findOneBy({id})
        return user
    }
    async getByEmail(email: string): Promise<User | null> {
        const user = await UserEntity.findOneBy({email})
        return user
    }
    delete(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

}