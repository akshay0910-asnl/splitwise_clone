import { signInUser } from '@controller/userController';
import { RequestHandler, Router } from 'express';
import signInUserMiddleware from '@middlewares/signIInUserMiddleware';

const router = Router();

router.post('/', signInUserMiddleware as RequestHandler, signInUser as RequestHandler);

export default router;