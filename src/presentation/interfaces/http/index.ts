import { badRequest, serverError } from "../../helpers/http";
import { Validation } from "../../validations";

export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  files?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export abstract class Controller {
  constructor(private readonly validation: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({...httpRequest.body, ...httpRequest.files});
      if (error) return badRequest(error);
      return await this.perform(httpRequest);
    } catch (error) {
      console.log(error)
      return serverError();
    }
  }

  abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
