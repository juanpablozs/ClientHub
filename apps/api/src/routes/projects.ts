import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as projectCtrl from '../controllers/projectController';

const router = Router();

router.use(requireAuth);

router.post('/', projectCtrl.createProject);
router.get('/', projectCtrl.listProjects);
router.get('/:id', projectCtrl.getProject);
router.put('/:id', projectCtrl.updateProject);
router.delete('/:id', projectCtrl.deleteProject);

export default router;
