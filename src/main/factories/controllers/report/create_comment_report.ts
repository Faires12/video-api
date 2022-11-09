import { CreateReportService } from "../../../../application/services"
import { CommentRepository, ReportRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateCommentReportController, CreateVideoReportController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeCreateCommentReportValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['commentId', 'reportType', 'content']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    for(const fieldname of ['commentId', 'reportType']){
        validations.push(new NumberValidation(fieldname, 1))
    }
    validations.push(new StringValidation('content', 5, 200))
    return new ValidationComposite(validations)
}

export const makeCreateCommentReportController = () : CreateCommentReportController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const reportRepository = new ReportRepository()
    const createReportService = new CreateReportService(reportRepository, videoRepository, commentRepository)
    return new CreateCommentReportController(makeCreateCommentReportValidation(), createReportService)
}