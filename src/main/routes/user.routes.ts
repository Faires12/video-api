import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  GetLoggedUserDataFactory,
  EditUserFactory,
  DeleteUserFactory,
  GetUserDataByEmailFactory,
  SearchUsersFactory,
} from "../factories/controllers";
import { AuthenticationFactory } from "../factories/middlewares";

const router = Router();

router.get(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetLoggedUserDataFactory())
);

router.post(
  "/search",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new SearchUsersFactory())
);

router.put(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new EditUserFactory())
);

router.delete(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new DeleteUserFactory())
);

router.get("/:email", adaptRoute(new GetUserDataByEmailFactory()));

export default router;
