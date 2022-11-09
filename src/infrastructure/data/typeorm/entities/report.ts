import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comment";
import { UserEntity } from "./user";
import { VideoEntity } from "./video";

@Entity("tb_report")
export class ReportEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    content: string
    
    @Column({type: "varchar", nullable: false})
    reportType: string

    @CreateDateColumn()
    createdAt: Date;

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
