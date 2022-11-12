import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  makeAddVideoToPlaylistController,
  makeCreatePlaylistController,
  makeRemoveVideoFromPlaylistController,
} from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.post(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeCreatePlaylistController())
);

router.post(
  "/add",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeAddVideoToPlaylistController())
);

router.post(
  "/remove",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeRemoveVideoFromPlaylistController())
);

export default router