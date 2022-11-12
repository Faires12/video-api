import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  makeCreateCommentReportController,
  makeCreateVideoReportController,
} from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.post(
  "/video",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreateVideoReportController())
);

router.post(
  "/comment",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreateCommentReportController())
);

export default router
