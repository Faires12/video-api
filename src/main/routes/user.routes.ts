import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import { makeGetLoggedUserDataController, makeGetUserDataByEmailController } from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.get(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetLoggedUserDataController())
);

router.get(
  "/:email",
  adaptRoute(makeGetUserDataByEmailController())
);

export default router