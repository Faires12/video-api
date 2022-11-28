import { GetSubscriptions } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetSubscriptionsController extends Controller{
    constructor(validation: Validation, private readonly getSubscriptionsService: GetSubscriptions) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const subs = await this.getSubscriptionsService.get(userId)
        return ok(subs)
    }
    
}