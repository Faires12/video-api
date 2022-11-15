import { User } from "../../../domain/entities";
import { UserRepositoryInterface } from "../../../domain/repositories";
import { GetUserDataByEmail } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class GetUserDataByEmailService implements GetUserDataByEmail {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async get(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);
    if (!user)
      throw new HttpException(HttpStatusCode.NotFound, "User not found");
    return {
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      subsCount: user.subsCount,
    };
  }
}
