import { Router } from 'express';
import { showHealth } from '@controller/HealthController';
const router = Router();

router.get('/', showHealth);

export default router;
