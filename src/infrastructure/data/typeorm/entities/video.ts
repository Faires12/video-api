import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => UserEntity, (user) => user.videos)
    created_by: UserEntity

    @Column({type: "int", default: 0})
    viewsCount: string 

    @Column({type: "int", default: 0})
    likesCount: string 

    @Column({type: "int", default: 0})
    deslikesCount: string 

    @CreateDateColumn()
    createdAt: Date;

    @Column({type: "varchar", nullable: true})
    description: string 
}