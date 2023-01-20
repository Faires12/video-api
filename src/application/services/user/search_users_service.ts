import { User } from "../../../domain/entities";
import { UserRepositoryInterface } from "../../../domain/repositories";
import { SearchUsers, SearchUsersInterface } from "../../../domain/usecases";

export class SearchUsersService implements SearchUsers{
    constructor(private readonly userRepository: UserRepositoryInterface) {}

    async search(infos: SearchUsersInterface): Promise<User[]> {
        return await this.userRepository.search(infos)
    }
}