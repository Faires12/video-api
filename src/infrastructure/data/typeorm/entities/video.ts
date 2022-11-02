import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comment";
import { EvaluationEntity } from "./evaluation";
import { UserEntity } from "./user";

@Entity()
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
    created_by: UserEntity

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

    @OneToMany(() => EvaluationEntity, (comment) => comment.video)
    evaluations: EvaluationEntity[]
}