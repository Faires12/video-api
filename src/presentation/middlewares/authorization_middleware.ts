import { forbidden } from "../helpers/http";
import { HttpRequest, HttpResponse, Middleware } from "../interfaces/http";

export class AuthorizationMiddleware extends Middleware {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (httpRequest.body.userId === 14)
      return await this.handleNext(httpRequest);
    return forbidden(new Error("Error 1"));
  }
}
