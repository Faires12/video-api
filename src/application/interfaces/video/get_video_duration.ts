export interface GetVideoDuration{
    get(videoURL: string): Promise<number>
}