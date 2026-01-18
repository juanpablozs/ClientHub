import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as clientCtrl from '../controllers/clientController';

const router = Router();

router.use(requireAuth);

router.post('/', clientCtrl.createClient);
router.get('/', clientCtrl.listClients);
router.get('/:id', clientCtrl.getClient);
router.put('/:id', clientCtrl.updateClient);
router.delete('/:id', clientCtrl.deleteClient);

export default router;
