import { CreateReport } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class CreateCommentReportController extends Controller{
    constructor(validation: Validation, private readonly createReportService: CreateReport) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, commentId, reportType, content} = httpRequest.body
        await this.createReportService.create({content, created_by: userId, referenceId: commentId, reportType, isVideo: false})
        return ok("Report created successfuly")
    }
}