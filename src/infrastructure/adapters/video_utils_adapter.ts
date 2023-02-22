import { GetVideoDuration } from "../../application/interfaces";
import {getVideoDurationInSeconds} from 'get-video-duration'

export class VideoUtilsAdapter implements GetVideoDuration{
    constructor(private readonly baseURL: string) {}

    async get(videoURL: string): Promise<number> {
        return Math.floor(await getVideoDurationInSeconds(`${this.baseURL}${videoURL}`))
    }
}