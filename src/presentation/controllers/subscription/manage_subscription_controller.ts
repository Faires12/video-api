import { ManageSubscription } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class ManageSubscriptionController extends Controller{
    constructor(validation: Validation, private readonly manageSubscriptionService: ManageSubscription) {super(validation)}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, subscribeTo} = httpRequest.body

        const res = await this.manageSubscriptionService.manage({userId, subscribeTo})

        return ok(res)
    }
}