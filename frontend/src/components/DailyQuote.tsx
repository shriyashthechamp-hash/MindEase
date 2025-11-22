import React from 'react';
import { Quote } from 'lucide-react';

export default function DailyQuote() {
    return (
        <div className="bg-gradient-to-br from-pastel-lavender/30 to-pastel-blue/30 rounded-2xl p-6 relative overflow-hidden">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-pastel-blue/50 rotate-180" />
            <div className="relative z-10 text-center py-4">
                <p className="font-heading text-xl text-gray-700 italic mb-4">
                    "Peace comes from within. Do not seek it without."
                </p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                    - Buddha
                </p>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 translate-y-10"></div>
        </div>
    );
}
