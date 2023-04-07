import { Router } from 'express';
import signupRoute from '@routes/signupRoute';
const router = Router();

router.use('/signup', signupRoute);

export default router;