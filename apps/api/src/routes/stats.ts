import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { Request, Response } from 'express';
import { dashboardStats } from '../services/statsService';

const router = Router();

router.use(requireAuth);

router.get('/dashboard', async (req: Request, res: Response) => {
  const ownerId = (req as any).user.id;
  const stats = await dashboardStats(ownerId);
  res.json(stats);
});

export default router;
