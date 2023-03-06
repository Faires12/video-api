import { Historic } from "../../entities"

export interface GetHistoricInterface{
    userId: number
    page: number
    rows: number
}

export interface GetHistoric{
    get(infos: GetHistoricInterface): Promise<Historic[]>
}