import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EvaluationEntity } from "./evaluation";
import { UserEntity } from "./user";
import { VideoEntity } from "./video";

@Entity()
export class CommentEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    content: string 

    @ManyToOne(() => UserEntity, (user) => user.comments, {eager: true})
    created_by: UserEntity

    @Column({type: "int", default: 0})
    likesCount: number 

    @Column({type: "int", default: 0})
    deslikesCount: number 

    @CreateDateColumn()
    createdAt: Date;

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
}