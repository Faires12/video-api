import { DataSource } from "typeorm";
import { CommentEntity } from "./entities/comment";
import { UserEntity } from "./entities/user";
import { VideoEntity } from "./entities/video";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "cleannode",
  synchronize: true,
  // logging: true,
  entities: [UserEntity, VideoEntity, CommentEntity],
});

