import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  makeAddVideoToPlaylistController,
  makeCreatePlaylistController,
  makeGetPlaylistByIdController,
  makeGetUserPlaylistController,
  makeRemoveVideoFromPlaylistController,
} from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.get(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetUserPlaylistController())
);

router.get(
  "/:id",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetPlaylistByIdController())
);

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