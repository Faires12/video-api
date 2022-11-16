import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import { makeGetSubscriptionController, makeManageSubscriptionController } from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

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

export default router