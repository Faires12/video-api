import {Router} from 'express'
import { adaptMiddleware, adaptRoute } from '../adapters';
import { CreateChatFactory, GetChatMessagesFactory, GetUserChats } from '../factories/controllers';
import { AuthenticationFactory } from '../factories/middlewares';

const router = Router()

router.get(
    "/",
    adaptMiddleware(new AuthenticationFactory()),
    adaptRoute(new GetUserChats())
);

router.post(
    "/",
    adaptMiddleware(new AuthenticationFactory()),
    adaptRoute(new CreateChatFactory())
);

router.get(
    "/messages/:chatId",
    adaptMiddleware(new AuthenticationFactory()),
    adaptRoute(new GetChatMessagesFactory())
);

export default router