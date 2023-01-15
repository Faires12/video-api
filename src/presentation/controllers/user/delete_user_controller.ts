import { DeleteUser } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class DeleteUserController extends Controller{
    constructor(private readonly deleteUserService: DeleteUser) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        await this.deleteUserService.delete(userId)
        return ok("User deleted")
    }
    
}