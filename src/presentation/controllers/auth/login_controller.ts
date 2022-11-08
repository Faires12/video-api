import { Login } from "../../../domain/usecases"
import { forbidden, ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"


export class LoginController extends Controller {
    constructor(validation : Validation,
        private readonly loginService : Login) {
            super(validation)
        }

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {email, password} = httpRequest.body

        const accessToken = await this.loginService.login({email, password})
        
        return ok(accessToken)
    }
}