import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  GetUserPlaylistsFactory,
  GetPlaylistByIdFactory,
  CreatePlaylistFactory,
  AddVideoToPlaylistFactory,
  RemoveVideoFromPlaylistFactory,
} from "../factories/controllers";
import { AuthenticationFactory } from "../factories/middlewares";

const router = Router();

router.get(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetUserPlaylistsFactory())
);

router.get(
  "/:id",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetPlaylistByIdFactory())
);

router.post(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new CreatePlaylistFactory())
);

router.post(
  "/add",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new AddVideoToPlaylistFactory())
);

router.post(
  "/remove",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new RemoveVideoFromPlaylistFactory())
);

export default router