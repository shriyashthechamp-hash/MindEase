import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.post('/order', authenticateUser, createOrder);
router.post('/verify', authenticateUser, verifyPayment); // Frontend calls this after success

export default router;
