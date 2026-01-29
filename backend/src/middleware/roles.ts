import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export const requireRole = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: No user found' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Forbidden: You do not have permission to perform this action'
            });
        }

        next();
    };
};

export const requireAdmin = requireRole([Role.ADMIN]);
export const requirePsychologist = requireRole([Role.PSYCHOLOGIST]);
export const requireRegisteredUser = requireRole([Role.USER, Role.PSYCHOLOGIST, Role.ADMIN]);
