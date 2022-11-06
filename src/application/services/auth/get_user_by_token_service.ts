import { User } from "../../../domain/entities"
import { UserRepositoryInterface } from "../../../domain/repositories"
import { GetUserByToken } from "../../../domain/usecases"
import { HttpException, HttpStatusCode } from "../../../utils/http"
import { JwtDecrypter } from "../../interfaces"


export class GetUserByTokenService implements GetUserByToken {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly jwtDecrypter: JwtDecrypter
      ) {}
    
    async getByToken(token: string): Promise<User> {
        const res = await this.jwtDecrypter.decrypt(token)
        if(!res.id)
            throw new HttpException(HttpStatusCode.BadRequest, "Invalid token")

        const user = await this.userRepository.getById(res.id)

        if(!user)
            throw new HttpException(HttpStatusCode.NotFound, "User not found")
        return user
    }

    
}