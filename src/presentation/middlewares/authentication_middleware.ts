import { GetUserByToken } from "../../domain/usecases";
import { Middleware, HttpRequest, HttpResponse } from "../interfaces/http";
import { Unauthorized } from "../helpers/http";
import { Validation } from "../validations";

export class AuthenticationMiddleware extends Middleware {
  constructor(
    private readonly getUserByTokenService: GetUserByToken,
  ) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { token } = httpRequest.headers;
    
    if (this.optional && !token)
      return await this.handleNext({ body: { userId: null } });

    const user = await this.getUserByTokenService.getByToken(token);
    if (user === null) return Unauthorized();
    return await this.handleNext({ body: { userId: user.id } });
  }
}
