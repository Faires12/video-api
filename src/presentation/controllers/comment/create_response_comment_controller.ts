import { CreateComment } from "../../../domain/usecases";
import { forbidden, ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";


export class CreateResponseCommentController extends Controller {
  constructor(
    validation: Validation,
    private readonly CreateCommentService: CreateComment
  ) {
    super(validation);
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId, commentId, content } = httpRequest.body;
    const comment = await this.CreateCommentService.create({
      userId,
      referenceId: commentId,
      content,
      isVideo: false,
    });

    return ok("Reponse created successfully");
  }
}
