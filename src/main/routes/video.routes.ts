import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  makeAddCommentEvaluationController,
  makeAddVideoEvaluationController,
  makeCreateResponseCommentController,
  makeCreateVideoCommentController,
  makeDeleteCommentController,
  makeDeleteVideoController,
  makeEditCommentController,
  makeEditVideoController,
  makeGetCommentController,
  makeGetCommentEvaluationController,
  makeGetCommentResponsesController,
  makeGetHomeVideosController,
  makeGetRelatedVideosController,
  makeGetUserVideosController,
  makeGetVideoCommentsController,
  makeGetVideoController,
  makeGetVideoEvaluationController,
  makeSearchVideosController,
  makeUploadVideoController,
} from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.get(
  "/home",
  adaptMiddleware(makeAuthMiddleware(false, true)),
  adaptRoute(makeGetHomeVideosController())
);

router.post(
  "/search",
  adaptMiddleware(makeAuthMiddleware(false, true)),
  adaptRoute(makeSearchVideosController())
);


router.get(
  "/:id",
  adaptMiddleware(makeAuthMiddleware(false, true)),
  adaptRoute(makeGetVideoController())
);

router.delete(
  "/:id",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeDeleteVideoController())
);

router.put(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeEditVideoController())
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

router.put(
  "/comment",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeEditCommentController())
);

router.delete(
  "/comment/:id",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeDeleteCommentController())
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
