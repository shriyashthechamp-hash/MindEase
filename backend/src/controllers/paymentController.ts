import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config } from '../config/env';
import { z } from 'zod';

const prisma = new PrismaClient();
// @ts-ignore
const razorpay = new Razorpay({
    key_id: config.razorpayKeyId || '',
    key_secret: config.razorpayKeySecret || '',
});

const createOrderSchema = z.object({
    sessionId: z.string().uuid(),
});

const verifyPaymentSchema = z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
});

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const validation = createOrderSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.format() });
        }

        const { sessionId } = validation.data;

        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            include: { psychologist: true, payment: true }
        });

        if (!session) return res.status(404).json({ error: 'Session not found' });
        if (session.userId !== userId) return res.status(403).json({ error: 'Not your session' });
        if (session.payment) return res.status(400).json({ error: 'Payment already initiated' });

        // Calculate amount (using psychologist rate, assumed hourly for now)
        // Rate is Decimal, convert to paise (x100)
        const amount = Number(session.psychologist.hourlyRate) * 100;

        if (amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

        const options = {
            amount,
            currency: 'INR',
            receipt: `receipt_session_${sessionId.substring(0, 8)}`,
            notes: { sessionId, userId }
        };

        const order = await razorpay.orders.create(options);

        if (!order) return res.status(500).json({ error: 'Razorpay order creation failed' });

        // Create Payment record
        const payment = await prisma.payment.create({
            data: {
                sessionId,
                userId,
                amount: session.psychologist.hourlyRate,
                orderId: order.id as string,
                status: 'CREATED',
                currency: 'INR',
            }
        });

        res.json({
            id: payment.id,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const validation = verifyPaymentSchema.safeParse(req.body);
        if (!validation.success) return res.status(400).json({ error: validation.error.format() });

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = validation.data;

        const generated_signature = crypto
            .createHmac('sha256', config.razorpayKeySecret || '')
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ error: 'Invalid signature' });
        }

        // Update Payment Status
        const payment = await prisma.payment.update({
            where: { orderId: razorpay_order_id },
            data: {
                status: 'PAID',
                paymentId: razorpay_payment_id,
            }
        });

        // Confirm Session
        await prisma.session.update({
            where: { id: payment.sessionId },
            data: { status: 'CONFIRMED' }
        });

        res.json({ status: 'success', message: 'Payment verified and session confirmed' });

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Payment verification failed' });
    }
}
