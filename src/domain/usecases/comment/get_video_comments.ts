import { Comment } from "../../entities/comment";
import { GetVideoCommentsInterface } from "../../repositories/comment_repository";

export interface GetVideoComments{
    get(infos: GetVideoCommentsInterface) : Promise<Comment[] | null>
}