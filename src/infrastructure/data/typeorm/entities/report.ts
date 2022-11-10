import {  Column,  Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract_entity";
import { CommentEntity } from "./comment";
import { UserEntity } from "./user";
import { VideoEntity } from "./video";

@Entity("tb_report")
export class ReportEntity extends AbstractEntity{
    @Column({type: "varchar", nullable: false})
    content: string
    
    @Column({type: "varchar", nullable: false})
    reportType: string

    @Column({type: "bool", default: false})
    read: boolean

    @ManyToOne(() => UserEntity, (user) => user.reports)
    @JoinColumn({name: "user_id"})
    created_by: UserEntity

    @Column({type: "int", nullable: false, name: "user_id"})
    userId: number

    @ManyToOne(() => VideoEntity, (video) => video.reports)
    video: VideoEntity

    @Column({type: "int", nullable: true})
    videoId: number

    @ManyToOne(() => CommentEntity, (comment) => comment.reports)
    comment: CommentEntity 

    @Column({type: "int", nullable: true})
    commentId: number
}
