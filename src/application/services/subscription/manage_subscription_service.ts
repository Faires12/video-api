import {
  SubscriptionRepositoryInterface,
  UserRepositoryInterface,
} from "../../../domain/repositories";
import {
  ManageSubscription,
  ManageSubscriptionInterface,
} from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class ManageSubscriptionService implements ManageSubscription {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async manage(infos: ManageSubscriptionInterface): Promise<boolean> {
    const otherUser = await this.userRepository.getByEmail(infos.subscribeTo)
    if (!otherUser || !otherUser.id)
      throw new HttpException(HttpStatusCode.NotFound, "Other user not found");
    if(infos.userId === otherUser.id)
      throw new HttpException(HttpStatusCode.BadRequest, "Cannot subscribe to yourself");
    const existingSubscription =
      await this.subscriptionRepository.getSubscription({
        subscriber: infos.userId,
        subscriptedTo: otherUser.id,
      });
    if (existingSubscription && existingSubscription.id){
      await this.subscriptionRepository.remove(existingSubscription.id);
      await this.userRepository.changeSubsCount({id: otherUser.id, isPositive: false})
      return false
    }     
    else {
      await this.subscriptionRepository.add({
        subscriber: infos.userId,
        subscriptedTo: otherUser.id,
      });
      await this.userRepository.changeSubsCount({id: otherUser.id, isPositive: true})
      return true
    }
      
  }
}
