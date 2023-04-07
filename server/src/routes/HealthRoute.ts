import { Router } from 'express';
import { showHealth } from '@controller/healthController';
const router = Router();

router.get('/', showHealth);

export default router;
