import { GetUserDataByEmail } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetUserDataByEmailController extends Controller{
    constructor(private readonly getUserDataByEmailService: GetUserDataByEmail) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {email} = httpRequest.params
        const user = await this.getUserDataByEmailService.get(email)
        return ok(user)
    }
}