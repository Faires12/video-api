import { EditUser } from "../../../domain/usecases";
import { FileInterface } from "../../../utils/file_interface";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class EditUserController extends Controller{
    constructor(validation: Validation, private readonly editUserService: EditUser) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, name} = httpRequest.body

        let avatar;
        if (httpRequest.files && httpRequest.files.avatar) {
            avatar = httpRequest.files.avatar as FileInterface;
        }
    
        const user = await this.editUserService.edit({userId, avatar, name})
        return ok(user)
    }
    
}