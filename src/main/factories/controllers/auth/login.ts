import { LoginService } from "../../../../application/services";
import { BcryptAdapter, JwtAdapter } from "../../../../infrastructure/adapters";
import { UserRepository } from "../../../../infrastructure/data/typeorm/repositories";
import { LoginController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/interfaces/http";
import { ControllerFactory } from "../../controller_factory";

export class LoginFactory extends ControllerFactory{  
  validations(): (Error | null)[] {
    return [
      this.validation.builder.setField('email').string().email().getError(),
      this.validation.builder.setField('password').string().minLength(3).maxLength(50).getError()
    ]
  }
  controller(): Controller {
    const userRepository = new UserRepository();
    const bcryptAdapter = new BcryptAdapter(12);
    const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas", Number(process.env.EXP) || 3600000);
    const loginService = new LoginService(
      userRepository,
      bcryptAdapter,
      jwtAdapter
    );
    return new LoginController(loginService);
  }
}

