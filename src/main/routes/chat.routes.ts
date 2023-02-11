import {Router} from 'express'
import { adaptMiddleware, adaptRoute } from '../adapters';
import { ClearChatNotificationsFactory, CreateChatFactory, GetChatMessagesFactory, GetChatNotificationsFactory, GetUserChatsFactory } from '../factories/controllers';
import { AuthenticationFactory } from '../factories/middlewares';

const router = Router()

router.get(
    "/",
    adaptMiddleware(new AuthenticationFactory()),
    adaptRoute(new GetUserChatsFactory())
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

router.get(
    "/notifications",
    adaptMiddleware(new AuthenticationFactory()),
    adaptRoute(new GetChatNotificationsFactory())
);

router.post(
    "/notifications/clear",
    adaptMiddleware(new AuthenticationFactory()),
    adaptRoute(new ClearChatNotificationsFactory())
);

export default router