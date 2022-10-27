export interface Video{
    id?: number
    title: string
    thumbnail: string
    path: string
    created_by: number
    viewsCount?: number
    likesCount?: number
    deslikesCount?: number
    createdAt?: Date
    description?: string
}