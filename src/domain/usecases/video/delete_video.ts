export interface DeleteVideoInterface{
    id: number
    userId: number
}

export interface DeleteVideo{
    delete(infos: DeleteVideoInterface) : Promise<void>
}