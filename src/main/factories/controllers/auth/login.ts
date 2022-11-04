import { LoginService } from "../../../../application/services";
import { BcryptAdapter, JwtAdapter } from "../../../../infrastructure/adapters";
import { UserRepository } from "../../../../infrastructure/data/typeorm/repositories";
import { LoginController } from "../../../../presentation/controllers";
import { makeLoginValidation } from "../../validations";

export function makeLoginController(): LoginController {
  const userRepository = new UserRepository();
  const bcryptAdapter = new BcryptAdapter(12);
  const jwtAdapter = new JwtAdapter(process.env.SECRET || "adsas");
  const loginService = new LoginService(
    userRepository,
    bcryptAdapter,
    jwtAdapter
  );
  const validations = makeLoginValidation();
  return new LoginController(validations, loginService);
}
