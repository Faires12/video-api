import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/repositories/user_repository";
import {
  Register,
  RegisterInterface,
} from "../../domain/usecases/auth/register";
import { Encrypter } from "../interfaces/encrypter";
import { SaveFileObject } from "../interfaces/SaveFileObject";
import { UuidGenerator } from "../interfaces/UuidGenerator";

export class RegisterService implements Register {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly encrypter: Encrypter,
    private readonly saveFileObject: SaveFileObject,
    private readonly uuidGenerator: UuidGenerator
  ) {}

  async register(new_user: RegisterInterface): Promise<User | null> {
    const existingUser = await this.userRepository.getByEmail(new_user.email);
    if (existingUser) return null;

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
