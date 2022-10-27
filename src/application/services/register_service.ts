import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/repositories/user_repository";
import { Register, RegisterInterface } from "../../domain/usecases/auth/register";
import { Encrypter } from "../interfaces/encrypter";

export class RegisterService implements Register {
    constructor(private readonly userRepository : UserRepositoryInterface, private readonly encrypter: Encrypter) {}

    async register(new_user: RegisterInterface): Promise<User | null> {
        const existingUser = await this.userRepository.getByEmail(new_user.email)
        if(existingUser)
            return null
            
        new_user.password = await this.encrypter.encrypt(new_user.password)
        const newUser = await this.userRepository.create(new_user)
        return newUser
    }
}