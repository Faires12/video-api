import { LoginService } from "../../../../application/services";
import { BcryptAdapter, JwtAdapter } from "../../../../infrastructure/adapters";
import { UserRepository } from "../../../../infrastructure/data/typeorm/repositories";
import { LoginController } from "../../../../presentation/controllers";
import { ValidatorAdapter } from "../../../../infrastructure/adapters"
import { EmailValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"


export function makeLoginValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['email', 'password']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    validations.push(new StringValidation('password', 3, 50))
    
    return new ValidationComposite(validations)
}

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
