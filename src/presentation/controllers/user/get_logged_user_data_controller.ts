import { GetLoggedUserData } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetLoggedUserDataController extends Controller{
    constructor(validation: Validation, private readonly getLoggedUserDataService: GetLoggedUserData) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const user = await this.getLoggedUserDataService.get(userId)
        return ok(user)
    }
    
}