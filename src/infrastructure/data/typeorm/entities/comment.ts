import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity, VideoEntity, EvaluationEntity, ReportEntity } from "./";
import { AbstractEntity } from "./abstract_entity";

@Entity("tb_comment")
export class CommentEntity extends AbstractEntity{
    @Column({type: "varchar", nullable: false})
    content: string 

    @ManyToOne(() => UserEntity, (user) => user.videos, {eager: true})
    @JoinColumn({name: 'user_id'})
    created_by: UserEntity

    @Column({type: 'int', name: 'user_id', nullable: false})
    userId: number

    @Column({type: "int", default: 0})
    likesCount: number 

    @Column({type: "int", default: 0})
    deslikesCount: number 

    @Column({type: "int", default: 0})
    commentCount: number 

    @ManyToOne(() => VideoEntity, (video) => video.comments)
    video: VideoEntity

    @Column({type: "int", nullable: true})
    videoId: number

    @ManyToOne(() => CommentEntity, (comment) => comment.comments)
    comment: CommentEntity

    @Column({type: "int", nullable: true})
    commentId: number

    @OneToMany(() => CommentEntity, (comment) => comment.comment)
    comments: CommentEntity[]

    @OneToMany(() => EvaluationEntity, (evaluation => evaluation.comment))
    evaluations: EvaluationEntity[]

    @OneToMany(() => ReportEntity, (report) => report.comment)
    reports: ReportEntity[]
}