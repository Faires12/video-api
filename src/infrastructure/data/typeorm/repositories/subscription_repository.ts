import { Subscription } from "../../../../domain/entities";
import {
  AddSubscriptionInterface,
  SubscriptionRepositoryInterface,
} from "../../../../domain/repositories";
import { SubscriptionEntity } from "../entities";

export class SubscriptionRepository implements SubscriptionRepositoryInterface {
  async getUserSubscriptions(userId: number): Promise<Subscription[]> {
    const subscriptions = await SubscriptionEntity.findBy({subscriberId: userId})
    return subscriptions.map(s => {
      return {
        subscriber: s.subscriberId,
        subscriptedTo: s.subscriptedToId
      }
    })
  }
  async getSubscription(
    infos: AddSubscriptionInterface
  ): Promise<Subscription | null> {
    const subscription = await SubscriptionEntity.findOneBy({
      subscriberId: infos.subscriber,
      subscriptedToId: infos.subscriptedTo,
    });
    if (!subscription) return null;
    return {
      id: subscription.id,
      subscriber: subscription.subscriberId,
      subscriptedTo: subscription.subscriptedToId,
    };
  }
  async add(infos: AddSubscriptionInterface): Promise<void> {
    const newSubscription = new SubscriptionEntity()
    newSubscription.subscriberId = infos.subscriber
    newSubscription.subscriptedToId = infos.subscriptedTo
    await newSubscription.save()

  }
  async remove(id: number): Promise<void> {
    const subscription = await SubscriptionEntity.findOneBy({id})
    if(subscription)
      await SubscriptionEntity.remove(subscription)
  }
}
