import { User, Role } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string; // Supabase/DB User ID
                email?: string;
                role: Role;
            };
        }
    }
}
