import { DataSource } from "typeorm";
import { CommentEntity, EvaluationEntity, PlaylistEntity, SubscriptionEntity, UserEntity, VideoEntity, ReportEntity } from "./entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "cleannode",
  synchronize: true,
  // logging: true,
  entities: [UserEntity, VideoEntity, CommentEntity, EvaluationEntity, PlaylistEntity, SubscriptionEntity, ReportEntity],
});

