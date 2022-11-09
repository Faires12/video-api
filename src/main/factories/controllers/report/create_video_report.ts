import { CreateReportService } from "../../../../application/services"
import { CommentRepository, ReportRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateVideoReportController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeCreateVideoReportValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['videoId', 'reportType', 'content']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    for(const fieldname of ['videoId', 'reportType']){
        validations.push(new NumberValidation(fieldname, 1))
    }
    validations.push(new StringValidation('content', 5, 200))
    return new ValidationComposite(validations)
}

export const makeCreateVideoReportController = () : CreateVideoReportController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const reportRepository = new ReportRepository()
    const createReportService = new CreateReportService(reportRepository, videoRepository, commentRepository)
    return new CreateVideoReportController(makeCreateVideoReportValidation(), createReportService)
}