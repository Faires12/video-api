export interface DeleteUser{
    delete(userId: number): Promise<void>
}