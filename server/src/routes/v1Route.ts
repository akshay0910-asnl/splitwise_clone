import { Router } from 'express';
import signUpRoute from '@routes/signUpRoute';
import signInRoute from '@routes/signInRoute';
const router = Router();

router.use('/signUp', signUpRoute);
router.use('/signIn', signInRoute);

export default router;