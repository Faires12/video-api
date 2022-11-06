import { Comment } from "../../entities";
import { GetVideoCommentsInterface } from "../../repositories";

export interface GetVideoComments{
    get(infos: GetVideoCommentsInterface) : Promise<Comment[]>
}