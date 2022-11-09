import { CrateReportInterface, ReportRepositoryInterface } from "../../../../domain/repositories";
import { ReportEntity } from "../entities";

export class ReportRepository implements ReportRepositoryInterface{
    async create(report: CrateReportInterface): Promise<void> {
        const newReport = new ReportEntity()
        newReport.content = report.content
        newReport.reportType = report.reportType
        newReport.userId = report.created_by
        if(report.videoId)
            newReport.videoId = report.videoId
        if(report.commentId)
            newReport.commentId = report.commentId
        await newReport.save()
    }
    
}