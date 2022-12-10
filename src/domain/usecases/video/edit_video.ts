import { FileInterface } from "../../../utils/file_interface"
import { Video } from "../../entities"

export interface EditVideoInterface{
    title?: string
    thumbnail?: FileInterface
    description?: string
    userId: number
    id: number
}

export interface EditVideo{
    edit(infos: EditVideoInterface) : Promise<Video>
}