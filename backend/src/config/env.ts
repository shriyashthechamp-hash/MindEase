import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
};

// Validate critical env vars in production
if (config.nodeEnv === 'production') {
    const missing = [];
    if (!config.databaseUrl) missing.push('DATABASE_URL');
    if (!config.supabaseUrl) missing.push('SUPABASE_URL');
    if (!config.supabaseKey) missing.push('SUPABASE_ANON_KEY');

    if (missing.length > 0) {
        console.error(`Missing critical environment variables: ${missing.join(', ')}`);
        // process.exit(1); // Uncomment to enforce
    }
}
