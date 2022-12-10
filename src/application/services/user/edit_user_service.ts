import { User } from "../../../domain/entities";
import { UserRepositoryInterface } from "../../../domain/repositories";
import { EditUser, EditUserInterface } from "../../../domain/usecases";
import { SaveFileObject, UuidGenerator } from "../../interfaces";

export class EditUserService implements EditUser{
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly saveFileObject: SaveFileObject,
        private readonly uuidGenerator: UuidGenerator
      ) {}

    async edit(infos: EditUserInterface): Promise<User> {
        let avatar;
        if (infos.avatar) {
            avatar = await this.saveFileObject.save(
                infos.avatar,
                this.uuidGenerator.generate()
            );
        }
        
        return await this.userRepository.edit({id: infos.userId, avatar, name: infos.name})
    }
    
}