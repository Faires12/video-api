import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "../adapters";
import { makeGetLoggedUserDataController } from "../factories/controllers/user/get_logged_user_data";
import { makeAuthMiddleware } from "../factories/middlewares/auth";

const router = Router();

router.get(
  "/",
  adaptMiddleware(makeAuthMiddleware(false)),
  adaptRoute(makeGetLoggedUserDataController())
);

export default router