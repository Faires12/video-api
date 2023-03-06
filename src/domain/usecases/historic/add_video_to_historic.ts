export interface AddVideoToHistoricInterface{
    userId: number
    videoId: number
    watchedTime: number
}

export interface AddVideoToHistoric{
    add(infos: AddVideoToHistoricInterface): Promise<void>
}