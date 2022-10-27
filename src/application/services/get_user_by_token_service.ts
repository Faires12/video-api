import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/repositories/user_repository";
import { GetUserByToken } from "../../domain/usecases/auth/get_user_by_token";
import { JwtDecrypter } from "../interfaces/jwt_decrypter";

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