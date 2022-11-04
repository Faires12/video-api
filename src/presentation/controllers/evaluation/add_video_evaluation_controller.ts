import { AddEvaluationService } from "../../../application/services/add_evaluation_service";
import { forbidden, ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class AddVideoEvaluationController extends Controller{
    constructor(validation : Validation, private readonly addEvaluationService : AddEvaluationService) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, videoId, isPositive} = httpRequest.body

        const evaluation = await this.addEvaluationService.create({
            created_by: userId,
            reference_id: videoId,
            isPositive: isPositive,
            isVideo: true
        })
        if(!evaluation)
            return forbidden(new Error("Video not found!"))

        return ok("Evaluation created successfully")
    }
    
}