import { ReportType } from "../../../domain/entities";
import { CommentRepositoryInterface, ReportRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { AddReportInterface, CreateReport } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class CreateReportService implements CreateReport{
    constructor(
        private readonly reportRepository: ReportRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface,
        private readonly commentRepository: CommentRepositoryInterface
      ) {}

    async create(infos: AddReportInterface): Promise<void> {
        if (
            infos.isVideo &&
            !(await this.videoRepository.getById(infos.referenceId))
          )
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");
          else if (
            !infos.isVideo &&
            !(await this.commentRepository.getById(infos.referenceId))
          )
            throw new HttpException(HttpStatusCode.NotFound, "Comment not found");

        if(!(infos.reportType in ReportType))
          throw new HttpException(HttpStatusCode.BadRequest, "Invalid report type");

        if(infos.isVideo)
            await this.reportRepository.create({content: infos.content, created_by: infos.created_by, reportType: ReportType[infos.reportType], 
            videoId: infos.referenceId})
        else
            await this.reportRepository.create({content: infos.content, created_by: infos.created_by, reportType: ReportType[infos.reportType], 
            commentId: infos.referenceId})
    }
    
}