import {  Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CommentEntity, EvaluationEntity, UserEntity, ReportEntity } from "./";
import { AbstractEntity } from "./abstract_entity";

@Entity("tb_video")
export class VideoEntity extends AbstractEntity{
    @Column({type: "varchar", nullable: false})
    title: string 
    
    @Column({type: "varchar", nullable: false})
    thumbnail: string 

    @Column({type: "varchar", nullable: false})
    path: string 

    @ManyToOne(() => UserEntity, (user) => user.videos, {eager: true})
    @JoinColumn({name: 'user_id'})
    created_by: UserEntity

    @Column({type: 'int', name: 'user_id', nullable: false})
    userId: number

    @Column({type: "int", default: 0})
    viewsCount: number 

    @Column({type: "int", default: 0})
    likesCount: number 

    @Column({type: "int", default: 0})
    deslikesCount: number 

    @Column({type: "int", default: 0})
    commentCount: number 

    @Column({type: "varchar", nullable: true})
    description: string 

    @OneToMany(() => CommentEntity, (comment) => comment.video)
    comments: CommentEntity[]

    @OneToMany(() => EvaluationEntity, (evaluation) => evaluation.video)
    evaluations: EvaluationEntity[]
    
    @OneToMany(() => ReportEntity, (report) => report.video)
    reports: ReportEntity[]
}