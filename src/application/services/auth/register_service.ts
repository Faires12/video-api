import { User } from "../../../domain/entities";
import { UserRepositoryInterface } from "../../../domain/repositories";
import { Register, RegisterInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { Encrypter, SaveFileObject, UuidGenerator } from "../../interfaces";

export class RegisterService implements Register {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly encrypter: Encrypter,
    private readonly saveFileObject: SaveFileObject,
    private readonly uuidGenerator: UuidGenerator
  ) {}

  async register(new_user: RegisterInterface): Promise<User> {
    const existingUser = await this.userRepository.getByEmail(new_user.email);
    if (existingUser) 
      throw new HttpException(HttpStatusCode.Forbidden, "User with email already exist");

    let avatar;
    if (new_user.avatarFile) {
      avatar = await this.saveFileObject.save(
        new_user.avatarFile,
        this.uuidGenerator.generate()
      );
    }

    new_user.password = await this.encrypter.encrypt(new_user.password);
    const newUser = await this.userRepository.create({
      name: new_user.name,
      email: new_user.email,
      password: new_user.password,
      avatar,
    });
    
    return newUser;
  }
}
