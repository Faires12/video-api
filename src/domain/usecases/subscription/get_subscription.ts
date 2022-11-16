import { ManageSubscriptionInterface } from "./manage_subscription";

export interface GetSubscrption{
    get(infos: ManageSubscriptionInterface) : Promise<boolean>
}