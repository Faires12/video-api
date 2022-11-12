import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import { makeManageSubscriptionController } from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.post(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeManageSubscriptionController())
);

export default router