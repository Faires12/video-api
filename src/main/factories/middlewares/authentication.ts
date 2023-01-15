import { GetUserByTokenService } from "../../../application/services";
import { JwtAdapter } from "../../../infrastructure/adapters";
import { UserRepository } from "../../../infrastructure/data/typeorm/repositories";
import { Middleware } from "../../../presentation/interfaces/http";
import { AuthenticationMiddleware } from "../../../presentation/middlewares";
import { MiddlewareFactory } from "../middleware_factory";

export class AuthenticationFactory extends MiddlewareFactory{  
    validations(optional?: boolean): (Error | null)[] {
      if(!optional)
        return [this.validation.builder.setField('token').string().jwt().getError()]
      else
        return [this.validation.builder.setField('token').string().jwt().optional().getError()]
    }
    middleware(): Middleware {
        const userRepository = new UserRepository()
        const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas", Number(process.env.EXP) || 3600000)
        const getUserByTokenService = new GetUserByTokenService(userRepository, jwtAdapter)
        const authMiddleware = new AuthenticationMiddleware(getUserByTokenService)
        return authMiddleware
    }
  }