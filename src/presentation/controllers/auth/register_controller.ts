import { FileInterface } from "../../../domain/entities";
import { Login, Register } from "../../../domain/usecases";
import { forbidden, ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";


export class RegisterController extends Controller  {
  constructor(
    validation: Validation,
    private readonly registerService: Register,
    private readonly loginService: Login
  ) {
    super(validation);
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, name, password } = httpRequest.body;

    let avatar;
    if (httpRequest.files && httpRequest.files.avatar) {
      avatar = httpRequest.files.avatar as FileInterface;
    }

    const user = await this.registerService.register({
      email,
      name,
      password,
      avatarFile: avatar,
    });
    if (!user) return forbidden(new Error("User with email already exists"));
    const accessToken = await this.loginService.login(email, password);
    if (!accessToken)
      return forbidden(new Error("Incorrect email or password"));

    return ok(accessToken);
  }
}
