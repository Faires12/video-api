import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
  makeGetSubscriptionController,
  makeGetSubscriptionsController,
  makeGetSubscriptionsVideosController,
  makeManageSubscriptionController,
} from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.get(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetSubscriptionsController())
);

router.get(
  "/videos",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetSubscriptionsVideosController())
);

router.get(
  "/:subscribeTo",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetSubscriptionController())
);

router.post(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeManageSubscriptionController())
);

export default router;
