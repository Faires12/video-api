import {  Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { UserEntity, VideoEntity } from "./";
import { AbstractEntity } from "./abstract_entity";

@Entity("tb_playlist")
export class PlaylistEntity extends AbstractEntity{
    @Column({type: "varchar", nullable: false})
    title: string 

    @Column({type: "varchar", nullable: true})
    description: string 

    @ManyToOne(() => UserEntity, (user) => user.videos, {eager: true})
    @JoinColumn({name: 'user_id'})
    created_by: UserEntity

    @Column({type: 'int', name: 'user_id', nullable: false})
    userId: number

    @ManyToMany(() => VideoEntity)
    @JoinTable({ 
        name: 'tb_playlist_video',
        joinColumn: { name: 'playlistId' },
        inverseJoinColumn: { name: 'videoId' }
      })
    videos: VideoEntity[]
}