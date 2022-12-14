import { Subscription } from "../entities"

export interface AddSubscriptionInterface{
    subscriber: number
    subscriptedTo: number
}

export interface SubscriptionRepositoryInterface{
    getSubscription(infos: AddSubscriptionInterface) : Promise<Subscription | null>
    getUserSubscriptions(userId: number) : Promise<Subscription[]>
    add(infos: AddSubscriptionInterface) : Promise<void>
    remove(id: number) : Promise<void>
}