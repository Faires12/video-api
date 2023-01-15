import { UserRepository } from "../../../infrastructure/data/typeorm/repositories";
import { Middleware } from "../../../presentation/interfaces/http";
import { AuthorizationMiddleware } from "../../../presentation/middlewares";
import { MiddlewareFactory } from "../middleware_factory";

export class AuthorizationFactory extends MiddlewareFactory{  
    validations(optional?: boolean): (Error | null)[] {
      return []
    }
    middleware(): Middleware {
        const userRepository = new UserRepository()
        return new AuthorizationMiddleware(userRepository)
    }
  }