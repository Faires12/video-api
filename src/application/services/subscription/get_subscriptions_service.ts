import {  User } from "../../../domain/entities";
import { SubscriptionRepositoryInterface, UserRepositoryInterface } from "../../../domain/repositories";
import { GetSubscriptions } from "../../../domain/usecases";

export class GetSubscriptionsService implements GetSubscriptions{
    constructor(private readonly subscriptionRepository: SubscriptionRepositoryInterface,
        private readonly userRepository: UserRepositoryInterface) {}

    async get(userId: number): Promise<User[]> {
        const subs = await this.subscriptionRepository.getUserSubscriptions(userId)
        const users : User[] = []
        for(const sub of subs){
            const user = await this.userRepository.getById(sub.subscriptedTo)
            if(!user)
                continue
            users.push({
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                subsCount: user.subsCount
            })
        }
        return users
    }

}