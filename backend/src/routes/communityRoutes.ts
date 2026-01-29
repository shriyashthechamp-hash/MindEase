import { Router } from 'express';
import { createPost, getFeed, reactToPost } from '../controllers/communityController';
import { authenticateUser, optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, getFeed); // Publicly viewable? Or auth only. Let's make it optional but recommended.
router.post('/', authenticateUser, createPost);
router.post('/react', authenticateUser, reactToPost);

export default router;
