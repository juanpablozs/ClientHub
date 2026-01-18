import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as authCtrl from '../controllers/authController';

const router = Router();

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

router.post('/register', limiter, authCtrl.register);
router.post('/login', limiter, authCtrl.login);
router.post('/refresh', authCtrl.refresh);
router.post('/logout', authCtrl.logout);

export default router;
