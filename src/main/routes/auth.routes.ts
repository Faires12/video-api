import {Router} from 'express'
import { adaptRoute } from '../adapters';
import { makeLoginController, makeRegisterController } from '../factories/controllers';

const router = Router()

router.post("/register", adaptRoute(makeRegisterController()));
router.post("/login", adaptRoute(makeLoginController()));

export default router