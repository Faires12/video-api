import { UserRepositoryInterface } from "../../../domain/repositories";
import { Login } from "../../../domain/usecases";
import { HashComparer, JwtEncrypter } from "../../interfaces";

export class LoginService implements Login {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashComparer: HashComparer,
    private readonly jwtEncrypter: JwtEncrypter
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    const existingUser = await this.userRepository.getByEmail(email);
    if (!existingUser || !existingUser.password) return null;
    if (!await this.hashComparer.compare(existingUser.password, password)) return null;
    return await this.jwtEncrypter.encrypt({id: existingUser.id});
  }
}
