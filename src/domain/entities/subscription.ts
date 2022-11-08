export interface Subscription{
    id: number
    subscriber: number
    subscriptedTo: number
    notify?: boolean
}