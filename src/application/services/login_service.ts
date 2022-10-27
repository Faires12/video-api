import { UserRepositoryInterface } from "../../domain/repositories/user_repository";
import { Login } from "../../domain/usecases/auth/login";
import { Decrypter } from "../interfaces/decrypter";
import { JwtEncrypter } from "../interfaces/jwt_encrypter";

export class LoginService implements Login {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly decrypter: Decrypter,
    private readonly jwtEncrypter: JwtEncrypter
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    const existingUser = await this.userRepository.getByEmail(email);
    if (!existingUser) return null;
    if (!await this.decrypter.decrypt(existingUser.password, password)) return null;
    return await this.jwtEncrypter.encrypt({id: existingUser.id});
  }
}
