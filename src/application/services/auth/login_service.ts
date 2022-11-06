import { UserRepositoryInterface } from "../../../domain/repositories";
import { Login } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { HashComparer, JwtEncrypter } from "../../interfaces";

export class LoginService implements Login {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashComparer: HashComparer,
    private readonly jwtEncrypter: JwtEncrypter
  ) {}

  async login(email: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.getByEmail(email);
    if (!existingUser || !existingUser.password) 
      throw new HttpException(HttpStatusCode.Unauthorized, "Invalid username or password");
    if (!await this.hashComparer.compare(existingUser.password, password)) 
      throw new HttpException(HttpStatusCode.Unauthorized, "Invalid username or password");
    return await this.jwtEncrypter.encrypt({id: existingUser.id});
  }
}
