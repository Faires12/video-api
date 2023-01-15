import {Router} from 'express'
import { adaptRoute } from '../adapters';
import { LoginFactory, RegisterFactory } from '../factories/controllers';

const router = Router()

router.post("/register", adaptRoute(new RegisterFactory()));
router.post("/login", adaptRoute(new LoginFactory()));

export default router