import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  CreateVideoReportFactory,
  CreateCommentReportFactory,
} from "../factories/controllers";
import { AuthenticationFactory } from "../factories/middlewares";

const router = Router();

router.post(
  "/video",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new CreateVideoReportFactory())
);

router.post(
  "/comment",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new CreateCommentReportFactory())
);

export default router
