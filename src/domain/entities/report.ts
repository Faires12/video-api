import { User } from "./";

export interface Report{
    created_by: User
    videoId?: number
    commentId?: number
    content: string
    created_at: Date
    id: number
    read: boolean
    reportType: string
}

export enum ReportType{
    Violencio = 1,
    Explicito = 2
}