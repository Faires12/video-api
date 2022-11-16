import { GetSubscrption } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetSubscriptionController extends Controller {
  constructor(
    validation: Validation,
    private readonly getSubscriptionService: GetSubscrption
  ) {
    super(validation);
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.body;
    const { subscribeTo } = httpRequest.params;

    const res = await this.getSubscriptionService.get({ userId, subscribeTo });

    return ok(res);
  }
}
