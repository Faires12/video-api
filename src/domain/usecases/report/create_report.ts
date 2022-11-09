export interface AddReportInterface{
    created_by: number
    content: string
    referenceId: number
    reportType: number
    isVideo: boolean
}

export interface CreateReport{
    create(infos: AddReportInterface) : Promise<void>
}