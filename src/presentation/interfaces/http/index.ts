import { HttpException } from "../../../utils/http";
import { badRequest, ok, serverError } from "../../helpers/http";
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
  private validation: Validation

  setValidation(validation: Validation) {
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {      
      if(this.validation){
        const error = this.validation.validate({
          ...httpRequest.body,
          ...httpRequest.files,
          ...httpRequest.query,
          ...httpRequest.params
        });
        if (error) return badRequest(error);
      } 
      return await this.perform(httpRequest);
    } catch (error) {
      if(error instanceof HttpException){
        return {
          statusCode: error.statusCode,
          body: {message: error.message}
        }
      }
      
      console.log(error);
      return serverError();
    }
  }

  abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export abstract class Middleware {
  private next: Middleware | null = null;
  private validation: Validation
  protected optional: boolean = false

  setValidation(validation: Validation) {
    this.validation = validation
  }

  setOptional(v: boolean) {
    this.optional = v
  }

  linkWith(middleware: Middleware): this {
    this.next = middleware;
    return this;
  }

  async handleNext(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!this.next) {
      return ok(httpRequest.body);
    }

    return await this.next.handle(httpRequest);
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (this.validation) {
        const error = this.validation.validate(httpRequest.headers);
        if (error) return badRequest(error);
      }

      return await this.perform(httpRequest);
    } catch (error) {
      if(error instanceof HttpException){
        return {
          statusCode: error.statusCode,
          body: {message: error.message}
        }
      }
      
      console.log(error);
      return serverError();
    }
  }

  abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>;
}
