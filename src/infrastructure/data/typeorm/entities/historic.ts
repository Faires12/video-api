import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity, VideoEntity } from "./";
import { AbstractEntity } from "./abstract_entity";

@Entity("tb_historic")
export class HistoricEntity extends AbstractEntity{
    @ManyToOne(() => UserEntity, (user) => user.historic, {eager: true})
    @JoinColumn({name: 'user_id'})
    user: UserEntity

    @Column({type: 'int', name: 'user_id', nullable: false})
    userId: number

    @ManyToOne(() => VideoEntity, (video) => video.historic, {eager: true})
    video: VideoEntity

    @Column({type: "int", nullable: false})
    videoId: number

    @Column({type: "int", nullable: false})
    watchedTime: number 
}