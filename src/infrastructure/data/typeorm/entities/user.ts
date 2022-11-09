import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import { CommentEntity, EvaluationEntity, VideoEntity, PlaylistEntity, SubscriptionEntity, ReportEntity } from "./";


@Entity("tb_user")
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true, nullable: false})
    email: string

    @Column({type: "varchar", nullable: false})
    password: string  

    @Column({type: "varchar", nullable: false})
    name: string  

    @Column({type: "varchar", default: "default_avatar.png"})
    avatar: string 

    @Column({type: "bool", default: false})
    isAdmin: boolean 

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