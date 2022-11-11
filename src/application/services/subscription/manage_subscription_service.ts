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

  async manage(infos: ManageSubscriptionInterface): Promise<void> {
    if (!(await this.userRepository.getById(infos.subscribeTo)))
      throw new HttpException(HttpStatusCode.NotFound, "Other user not found");
    if(infos.userId === infos.subscribeTo)
      throw new HttpException(HttpStatusCode.BadRequest, "Cannot subscribe to yourself");
    const existingSubscription =
      await this.subscriptionRepository.getSubscription({
        subscriber: infos.userId,
        subscriptedTo: infos.subscribeTo,
      });
    if (existingSubscription && existingSubscription.id){
      await this.subscriptionRepository.remove(existingSubscription.id);
      await this.userRepository.changeSubsCount({id: infos.subscribeTo, isPositive: false})
    }     
    else {
      await this.subscriptionRepository.add({
        subscriber: infos.userId,
        subscriptedTo: infos.subscribeTo,
      });
      await this.userRepository.changeSubsCount({id: infos.subscribeTo, isPositive: true})
    }
      
  }
}
