import { User } from "./";
import { AbstractEntity } from "./abstract_entity";

export interface Report extends AbstractEntity{
    created_by: User
    videoId?: number
    commentId?: number
    content: string
    read: boolean
    reportType: string
}

export enum ReportType{
    Violencio = 1,
    Explicito = 2
}