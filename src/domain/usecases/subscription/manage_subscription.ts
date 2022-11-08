export interface ManageSubscriptionInterface{
    userId: number
    subscribeTo: number
}

export interface ManageSubscription{
    manage(infos: ManageSubscriptionInterface) : Promise<void>
}