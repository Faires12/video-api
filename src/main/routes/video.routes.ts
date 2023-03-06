import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  GetHomeVideosFactory,
  SearchVideosFactory,
  GetVideoFactory,
  DeleteVideoFactory,
  EditVideoFactory,
  GetUserVideosFactory,
  GetRelatedVideosFactory,
  UploadVideoFactory,
  GetCommentFactory,
  CreateVideoCommentFactory,
  EditCommentFactory,
  DeleteCommentFactory,
  GetVideoCommentsFactory,
  GetCommentResponsesFactory,
  CreateResponseCommentFactory,
  AddCommentEvaluationFactory,
  AddVideoEvaluationFactory,
  GetCommentEvaluationFactory,
  GetVideoEvaluationFactory,
  GetHistoricFactory
} from "../factories/controllers";
import { AuthenticationFactory } from "../factories/middlewares";

const router = Router();

router.get(
  "/home",
  adaptMiddleware(new AuthenticationFactory(true)),
  adaptRoute(new GetHomeVideosFactory())
);

router.get(
  "/historic",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetHistoricFactory())
);

router.post(
  "/search",
  adaptMiddleware(new AuthenticationFactory(true)),
  adaptRoute(new SearchVideosFactory())
);

router.get(
  "/:id",
  adaptMiddleware(new AuthenticationFactory(true)),
  adaptRoute(new GetVideoFactory())
);

router.delete(
  "/:id",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new DeleteVideoFactory())
);

router.put(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new EditVideoFactory())
);

router.get(
  "/user/:email",
  adaptRoute(new GetUserVideosFactory())
);

router.get(
  "/related/:videoId",
  adaptRoute(new GetRelatedVideosFactory())
);

router.post(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new UploadVideoFactory())
);

router.get(
  "/comment/:commentId",
  adaptMiddleware(new AuthenticationFactory(true)),
  adaptRoute(new GetCommentFactory())
);

router.post(
  "/comment",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new CreateVideoCommentFactory())
);

router.put(
  "/comment",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new EditCommentFactory())
);

router.delete(
  "/comment/:id",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new DeleteCommentFactory())
);

router.get(
  "/comments/:videoId",
  adaptMiddleware(new AuthenticationFactory(true)),
  adaptRoute(new GetVideoCommentsFactory())
);

router.get(
  "/comments/responses/:commentId",
  adaptMiddleware(new AuthenticationFactory(true)),
  adaptRoute(new GetCommentResponsesFactory())
);

router.post(
  "/comment/response",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new CreateResponseCommentFactory())
);

router.post(
  "/comment/evaluation",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new AddCommentEvaluationFactory())
);

router.post(
  "/evaluation",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new AddVideoEvaluationFactory())
);

router.get(
  "/comment/evaluation/:commentId",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetCommentEvaluationFactory())
);

router.get(
  "/evaluation/:videoId",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetVideoEvaluationFactory())
);

export default router;
