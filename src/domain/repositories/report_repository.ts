export interface CrateReportInterface{
    created_by: number
    content: string
    videoId?: number
    commentId?: number
    reportType: string
}

export interface ReportRepositoryInterface{
    create(report: CrateReportInterface) : Promise<void>
}