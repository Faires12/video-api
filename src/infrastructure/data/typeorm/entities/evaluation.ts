import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity, UserEntity, VideoEntity  } from "./";


@Entity("tb_evaluation")
export class EvaluationEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "bool", nullable: false})
    isPositive: boolean 

    @ManyToOne(() => UserEntity, (user) => user.evaluations)
    @JoinColumn({name: "user_id"})
    created_by: UserEntity

    @Column({type: "int", nullable: false, name: "user_id"})
    userId: number

    @ManyToOne(() => VideoEntity, (video) => video.evaluations)
    video: VideoEntity

    @Column({type: "int", nullable: true})
    videoId: number

    @ManyToOne(() => CommentEntity, (comment) => comment.evaluations)
    comment: CommentEntity 

    @Column({type: "int", nullable: true})
    commentId: number
}