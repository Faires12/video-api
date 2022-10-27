import { Login } from "../../../domain/usecases/auth/login";
import { Register } from "../../../domain/usecases/auth/register";
import { badRequest, forbidden, ok, serverError } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class RegisterController implements Controller {
    constructor(private readonly validation : Validation, private readonly registerService: Register,
        private readonly loginService : Login) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if(error)
                return badRequest(error)

            const {email, name, password} = httpRequest.body

            const user = await this.registerService.register({email, name, password})
            if(!user)
                return forbidden(new Error("User with email already exists"))
            const accessToken = await this.loginService.login(email, password)
            if(!accessToken)
                return forbidden(new Error("Incorrect email or password"))
            
            return ok(accessToken)
        } catch (error) {
            return serverError()
        }
    }
}