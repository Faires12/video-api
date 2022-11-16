import {
  SubscriptionRepositoryInterface,
  UserRepositoryInterface,
} from "../../../domain/repositories";
import {
  GetSubscrption,
  ManageSubscriptionInterface,
} from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class GetSubscriptionService implements GetSubscrption {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async get(infos: ManageSubscriptionInterface): Promise<boolean> {
    const otherUser = await this.userRepository.getByEmail(infos.subscribeTo)
    if (!otherUser || !otherUser.id)
      throw new HttpException(HttpStatusCode.NotFound, "Other user not found");
    if (infos.userId === otherUser.id)
      throw new HttpException(
        HttpStatusCode.BadRequest,
        "Cannot subscribe to yourself"
      );

      const existingSubscription =
      await this.subscriptionRepository.getSubscription({
        subscriber: infos.userId,
        subscriptedTo: otherUser.id,
      });
    return existingSubscription ? true : false;
  }
}
