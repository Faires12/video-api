import { User } from "../../../domain/entities"
import { UserRepositoryInterface } from "../../../domain/repositories"
import { GetUserByToken } from "../../../domain/usecases"
import { JwtDecrypter } from "../../interfaces"


export class GetUserByTokenService implements GetUserByToken {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly jwtDecrypter: JwtDecrypter
      ) {}
    
    async getByToken(token: string): Promise<User | null> {
        const res = await this.jwtDecrypter.decrypt(token)
        if(!res.id)
            return null
        const user = await this.userRepository.getById(res.id)
        return user
    }

    
}