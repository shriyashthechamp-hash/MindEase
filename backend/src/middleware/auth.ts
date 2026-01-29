import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env';
import { PrismaClient } from '@prisma/client';

const supabase = createClient(config.supabaseUrl || '', config.supabaseKey || '');
const prisma = new PrismaClient(); // In a real app, import singleton

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            // Allow anonymous logic if needed, but for now strict auth or explicit optional
            return res.status(401).json({ error: 'Missing Authorization header' });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('Auth Error:', error?.message);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Fetch user role from our DB
        // Optimization: In production, cache this or embed in metadata if possible
        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true, email: true }
        });

        if (!dbUser) {
            // User exists in Supabase but not in our DB? 
            // Could be first login or sync issue.
            // For now, fail safe or creating one might be needed.
            return res.status(403).json({ error: 'User profile not found' });
        }

        req.user = {
            id: user.id,
            email: dbUser.email,
            role: dbUser.role
        };

        next();
    } catch (err) {
        console.error('Unexpected Auth Error:', err);
        res.status(500).json({ error: 'Internal Server Error during auth' });
    }
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
    // Similar to above but doesn't fail if no token
    // useful for feed where anonymous reading is allowed
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();

    // Attempt auth but swallow errors
    try {
        const token = authHeader.split(' ')[1];
        const { data: { user } } = await supabase.auth.getUser(token);
        if (user) {
            const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
            if (dbUser) {
                req.user = { id: user.id, email: dbUser.email, role: dbUser.role };
            }
        }
    } catch { }
    next();
};
