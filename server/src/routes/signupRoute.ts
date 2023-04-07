import { createUser } from '@controller/userController';
import { RequestHandler, Router } from 'express';
import createUserMiddleware from '@middlewares/createUserMiddleWare';

const router = Router();


router.post('/', createUserMiddleware as RequestHandler, createUser as RequestHandler);

export default router;
