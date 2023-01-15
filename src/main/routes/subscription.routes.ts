import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  GetSubscriptionFactory,
  GetSubscriptionsFactory,
  GetSubscriptionsVideosFactory,
  ManageSubscriptionFactory,
} from "../factories/controllers";
import { AuthenticationFactory } from "../factories/middlewares";

const router = Router();

router.get(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetSubscriptionsFactory())
);

router.get(
  "/videos",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetSubscriptionsVideosFactory())
);

router.get(
  "/:subscribeTo",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new GetSubscriptionFactory())
);

router.post(
  "/",
  adaptMiddleware(new AuthenticationFactory()),
  adaptRoute(new ManageSubscriptionFactory())
);

export default router;
