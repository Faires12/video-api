import { Login } from "../../../domain/usecases/auth/login";
import { badRequest, forbidden, ok, serverError } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class LoginController implements Controller {
    constructor(private readonly validation : Validation,
        private readonly loginService : Login) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if(error)
                return badRequest(error)
            const {email, password} = httpRequest.body

            const accessToken = await this.loginService.login(email, password)
            if(!accessToken)
                return forbidden(new Error("Incorrect email or password"))
            
            return ok(accessToken)
        } catch (error) {
            return serverError()
        }
    }
}