import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract_entity";
import { UserEntity } from "./user";

@Entity("tb_subscription")
export class SubscriptionEntity extends AbstractEntity{
    @ManyToOne(() => UserEntity, (user) => user.subscribers)
    @JoinColumn({name: "subscriber_id"})
    subscriber: UserEntity

    @Column({type: "int", nullable: false, name: "subscriber_id"})
    subscriberId: number

    @ManyToOne(() => UserEntity, (user) => user.subscriptions)
    @JoinColumn({name: "subscripted_to_id"})
    subscriptedTo: UserEntity

    @Column({type: "int", nullable: false, name: "subscripted_to_id"})
    subscriptedToId: number
}