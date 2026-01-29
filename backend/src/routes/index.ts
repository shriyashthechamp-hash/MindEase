import { Router } from 'express';
import moodRoutes from './moodRoutes';
import communityRoutes from './communityRoutes';
import psychologistRoutes from './psychologistRoutes';
import sessionRoutes from './sessionRoutes';
import paymentRoutes from './paymentRoutes';

const router = Router();

router.use('/moods', moodRoutes);
router.use('/community', communityRoutes);
router.use('/psychologists', psychologistRoutes);
router.use('/sessions', sessionRoutes);
router.use('/payments', paymentRoutes);

export default router;
