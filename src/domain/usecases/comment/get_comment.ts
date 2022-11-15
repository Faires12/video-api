import { Comment } from "../../entities";
import { CommentDTO } from "./get_video_comments";

export interface GetComment{
    get(id: number, userId: number | null) : Promise<CommentDTO>
}