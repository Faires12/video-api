import { UserRepositoryInterface } from "../../../domain/repositories";
import { Login, LoginInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { HashComparer, JwtEncrypter } from "../../interfaces";

export class LoginService implements Login {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashComparer: HashComparer,
    private readonly jwtEncrypter: JwtEncrypter
  ) {}

  async login(infos: LoginInterface): Promise<string> {
    const existingUser = await this.userRepository.getByEmail(infos.email);
    if (!existingUser || !existingUser.password) 
      throw new HttpException(HttpStatusCode.Unauthorized, "Invalid username or password");
    if (!await this.hashComparer.compare(existingUser.password, infos.password)) 
      throw new HttpException(HttpStatusCode.Unauthorized, "Invalid username or password");
    return await this.jwtEncrypter.encrypt({id: existingUser.id});
  }
}
