import { CreateReportService } from "../../../../application/services"
import { CommentRepository, ReportRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateVideoReportController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class CreateVideoReportFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('videoId').number().min(1).getError(),
            this.validation.builder.setField('reportType').number().min(1).getError(),
            this.validation.builder.setField('content').string().minLength(5).maxLength(200).getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const commentRepository = new CommentRepository()
        const reportRepository = new ReportRepository()
        const createReportService = new CreateReportService(reportRepository, videoRepository, commentRepository)
        return new CreateVideoReportController(createReportService)
    }
}