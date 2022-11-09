import { UserRepositoryInterface } from "../../domain/repositories";
import { forbidden } from "../helpers/http";
import { HttpRequest, HttpResponse, Middleware } from "../interfaces/http";

export class AuthorizationMiddleware extends Middleware {
  constructor(private readonly userRepository: UserRepositoryInterface) {super()}

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const {userId} = httpRequest.body
    
    const user = await this.userRepository.getById(userId)
    if(!user || !user.isAdmin)
      return forbidden(new Error("User is not authorized"))
    return await this.handleNext(httpRequest)
  }
}
