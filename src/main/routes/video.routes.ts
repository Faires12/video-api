import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  makeAddCommentEvaluationController,
  makeAddVideoEvaluationController,
  makeCreateResponseCommentController,
  makeCreateVideoCommentController,
  makeGetCommentController,
  makeGetCommentEvaluationController,
  makeGetCommentResponsesController,
  makeGetHomeVideosController,
  makeGetRelatedVideosController,
  makeGetUserVideosController,
  makeGetVideoCommentsController,
  makeGetVideoController,
  makeGetVideoEvaluationController,
  makeUploadVideoController,
} from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.get(
  "/home",
  adaptMiddleware(makeAuthMiddleware(false, true)),
  adaptRoute(makeGetHomeVideosController())
);

router.get(
  "/:id",
  adaptMiddleware(makeAuthMiddleware(false, true)),
  adaptRoute(makeGetVideoController())
);

router.get(
  "/user/:email",
  adaptRoute(makeGetUserVideosController())
);

router.get(
  "/related/:videoId",
  adaptRoute(makeGetRelatedVideosController())
);

router.post(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeUploadVideoController())
);

router.get(
  "/comment/:commentId",
  adaptMiddleware(makeAuthMiddleware(false, true)),
  adaptRoute(makeGetCommentController())
);

router.post(
  "/comment",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreateVideoCommentController())
);

router.get(
  "/comments/:videoId",
  adaptMiddleware(makeAuthMiddleware(false, true)),
  adaptRoute(makeGetVideoCommentsController())
);

router.get(
  "/comments/responses/:commentId",
  adaptMiddleware(makeAuthMiddleware(false, true)),
  adaptRoute(makeGetCommentResponsesController())
);

router.post(
  "/comment/response",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreateResponseCommentController())
);

router.post(
  "/comment/evaluation",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeAddCommentEvaluationController())
);

router.post(
  "/evaluation",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeAddVideoEvaluationController())
);

router.get(
  "/comment/evaluation/:commentId",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetCommentEvaluationController())
);

router.get(
  "/evaluation/:videoId",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetVideoEvaluationController())
);

export default router;
