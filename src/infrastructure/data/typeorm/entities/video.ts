import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity, EvaluationEntity, UserEntity, ReportEntity } from "./";

@Entity("tb_video")
export class VideoEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    createdAt: Date;

    @Column({type: "varchar", nullable: true})
    description: string 

    @OneToMany(() => CommentEntity, (comment) => comment.video)
    comments: CommentEntity[]

    @OneToMany(() => EvaluationEntity, (evaluation) => evaluation.video)
    evaluations: EvaluationEntity[]
    
    @OneToMany(() => ReportEntity, (report) => report.video)
    reports: ReportEntity[]
}