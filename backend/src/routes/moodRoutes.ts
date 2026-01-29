import { Router } from 'express';
import { logMood, getMoodHistory } from '../controllers/moodController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// versatile: both require valid user (anon or registered)
router.post('/', authenticateUser, logMood);
router.get('/', authenticateUser, getMoodHistory);

export default router;
