import { FileInterface } from "../../../application/interfaces/file_interface";
import { Video } from "../../entities/video";

export interface UploadVideoInterface{
    title: string
    thumbnail: FileInterface
    file: FileInterface
    userId: number
    description?: string
}

export interface UploadVideo{
    upload(uploadVideo : UploadVideoInterface) : Promise<Video | null>
}