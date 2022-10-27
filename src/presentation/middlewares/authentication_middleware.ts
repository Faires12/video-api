import { GetUserByToken } from "../../domain/usecases/auth/get_user_by_token";
import { badRequest, Unauthorized, ok, serverError } from "../helpers/http";
import { HttpRequest, HttpResponse, Middleware } from "../interfaces/http";
import { Validation } from "../validations";

export class AuthenticationMiddleware implements Middleware {
    constructor(private readonly validation: Validation,
        private readonly getUserByTokenService: GetUserByToken) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.headers)
            if(error)
                return badRequest(error)

            const {token} = httpRequest.headers

            const user = await this.getUserByTokenService.getByToken(token)
            if(user == null)
                return Unauthorized()
            return ok({userId: user.id})
        } catch (error) {
            return serverError()
        }
    }
}