import { FileInterface } from "../../../utils/file_interface"
import { Video } from "../../entities"

export interface UploadVideoInterface{
    title: string
    thumbnail: FileInterface
    file: FileInterface
    userId: number
    description?: string
}

export interface UploadVideo{
    upload(uploadVideo : UploadVideoInterface) : Promise<Video>
}