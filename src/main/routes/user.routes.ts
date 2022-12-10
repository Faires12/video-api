import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import { makeDeleteUserController, makeEditUserController, makeGetLoggedUserDataController, makeGetUserDataByEmailController } from "../factories/controllers";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.get(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetLoggedUserDataController())
);

router.put(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeEditUserController())
);

router.delete(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeDeleteUserController())
);

router.get(
  "/:email",
  adaptRoute(makeGetUserDataByEmailController())
);

export default router