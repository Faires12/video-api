import { Comment } from "../../entities";

export interface GetComment{
    get(id: number, userId: number | null) : Promise<Comment>
}