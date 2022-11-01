import { GetUserByToken } from "../../domain/usecases/auth/get_user_by_token";
import { Unauthorized } from "../helpers/http";
import { HttpRequest, HttpResponse, Middleware } from "../interfaces/http";
import { Validation } from "../validations";

export class AuthenticationMiddleware extends Middleware {
  constructor(
    validation: Validation,
    private readonly getUserByTokenService: GetUserByToken
  ) {
    super(validation);
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { token } = httpRequest.headers;

    const user = await this.getUserByTokenService.getByToken(token);
    if (user == null) return Unauthorized();
    return await this.handleNext({ body: { userId: user.id } });
  }
}
