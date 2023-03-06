import { Historic } from "../entities";

export interface GetByUserAndVideoInterface{
    userId: number
    videoId: number
}

export interface CreateHistoricInterface{
    userId: number
    videoId: number
    watchedTime: number
}

export interface UpdateHistoricInterface{
    id: number
    watchedTime: number
}

export interface GetUserHistoric{
    userId: number
    page: number
    rows: number
}

export interface HistoricRepositoryInterface{
    getByUserAndVideo(infos: GetByUserAndVideoInterface): Promise<Historic | null>
    create(infos: CreateHistoricInterface): Promise<Historic>
    update(infos: UpdateHistoricInterface): Promise<Historic>
    get(infos: GetUserHistoric): Promise<Historic[]>
}