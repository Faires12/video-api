import { Entity, Column, OneToMany } from "typeorm";
import { CommentEntity, EvaluationEntity, VideoEntity, PlaylistEntity, SubscriptionEntity, ReportEntity } from "./";
import { AbstractEntity } from "./abstract_entity";


@Entity("tb_user")
export class UserEntity extends AbstractEntity{
    @Column({type: "varchar", unique: true, nullable: false})
    email: string

    @Column({type: "varchar", nullable: false})
    password: string  

    @Column({type: "varchar", nullable: false})
    name: string  

    @Column({type: "varchar", default: "default_avatar.jpg"})
    avatar: string 

    @Column({type: "bool", default: false})
    isAdmin: boolean 

    @Column({type: "int", default: 0})
    subsCount: number 

    @OneToMany(() => VideoEntity, (video) => video.created_by)
    videos: VideoEntity[]

    @OneToMany(() => CommentEntity, (comment) => comment.created_by)
    comments: CommentEntity[]

    @OneToMany(() => EvaluationEntity, (evaluation) => evaluation.created_by)
    evaluations: EvaluationEntity[]

    @OneToMany(() => PlaylistEntity, (playlist) => playlist.created_by)
    playlists: PlaylistEntity[]

    @OneToMany(() => SubscriptionEntity, (subscription) => subscription.subscriber)
    subscribers: SubscriptionEntity[]

    @OneToMany(() => SubscriptionEntity, (subscription) => subscription.subscriptedTo)
    subscriptions: SubscriptionEntity[]

    @OneToMany(() => ReportEntity, (report) => report.created_by)
    reports: ReportEntity[]
}