import { User } from "../../../../domain/entities"
import { CreateUserInterface, UserRepositoryInterface } from "../../../../domain/repositories"
import { UserEntity } from "../entities"

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
        return {
            id: userEntity.id,
            name: userEntity.name,
            isAdmin: userEntity.isAdmin,
            email: userEntity.email,
            avatar: userEntity.avatar,
            password: userEntity.password
        }
    }
    async getById(id: number): Promise<User | null> {
        const user = await UserEntity.findOneBy({id})
        if(!user)
            return null
        return {
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
            avatar: user.avatar,
            password: user.password
        }
    }
    async getByEmail(email: string): Promise<User | null> {
        const user = await UserEntity.findOneBy({email})
        if(!user)
            return null
        return {
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
            avatar: user.avatar,
            password: user.password
        }
    }
}