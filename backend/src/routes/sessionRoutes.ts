import { Router } from 'express';
import { createSession, getMySessions } from '../controllers/sessionController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.post('/', authenticateUser, createSession);
router.get('/', authenticateUser, getMySessions);

export default router;
