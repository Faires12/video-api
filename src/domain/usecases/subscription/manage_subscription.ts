export interface ManageSubscriptionInterface{
    userId: number
    subscribeTo: string
}

export interface ManageSubscription{
    manage(infos: ManageSubscriptionInterface) : Promise<boolean>
}