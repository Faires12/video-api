import "reflect-metadata";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";

import { adaptRoute, adaptMiddleware } from "./adapters";
import {
  makeAddCommentEvaluationController,
  makeAddVideoEvaluationController,
  makeAddVideoToPlaylistController,
  makeCreateCommentReportController,
  makeCreatePlaylistController,
  makeCreateResponseCommentController,
  makeCreateVideoCommentController,
  makeCreateVideoReportController,
  makeGetVideoCommentsController,
  makeGetVideoController,
  makeLoginController,
  makeManageSubscriptionController,
  makeRegisterController,
  makeRemoveVideoFromPlaylistController,
  makeUploadVideoController,
} from "./factories/controllers";
import { makeAuthMiddleware } from "./factories/middlewares/auth";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname + "/public")));

app.set("port", process.env.PORT || 3000);

app.post("/api/register", adaptRoute(makeRegisterController()));
app.post("/api/login", adaptRoute(makeLoginController()));
app.get("/api/video/:id", adaptRoute(makeGetVideoController()));
app.post(
  "/api/video",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeUploadVideoController())
);
app.get(
  "/api/comment/video/:videoId",
  adaptRoute(makeGetVideoCommentsController())
);
app.post(
  "/api/comment/video",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreateVideoCommentController())
);
app.post(
  "/api/comment/response",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreateResponseCommentController())
);
app.post(
  "/api/evaluation/video",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeAddVideoEvaluationController())
);
app.post(
  "/api/evaluation/comment",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeAddCommentEvaluationController())
);

app.post(
  "/api/playlist",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreatePlaylistController())
);

app.post(
  "/api/playlist/add",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeAddVideoToPlaylistController())
);

app.post(
  "/api/playlist/remove",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeRemoveVideoFromPlaylistController())
);

app.post(
  "/api/subscription",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeManageSubscriptionController())
);

app.post(
  "/api/report/video",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreateVideoReportController())
);

app.post(
  "/api/report/comment",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreateCommentReportController())
);

export default app;
