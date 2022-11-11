import { User } from "../../../domain/entities";
import { UserRepositoryInterface } from "../../../domain/repositories";
import { GetLoggedUserData } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class GetLoggedUserDataService implements GetLoggedUserData{
    constructor(private readonly userRepository: UserRepositoryInterface){}

    async get(id: number): Promise<User> {
        const user = await this.userRepository.getById(id)
        if(!user)
            throw new HttpException(HttpStatusCode.NotFound, "User not found")
        return {
            email: user.email,
            name: user.name,
            avatar: user.avatar
        }
    }
    
}