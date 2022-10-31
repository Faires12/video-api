import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import { VideoEntity } from "./video";

@Entity()
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

    @OneToMany(() => VideoEntity, (video) => video.created_by)
    videos: VideoEntity[]
}