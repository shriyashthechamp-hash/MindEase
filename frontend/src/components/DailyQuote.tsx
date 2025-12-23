import React from 'react';
import { Sparkles } from 'lucide-react';

export default function DailyQuote() {
    return (
        <div className="bg-brutal-purple border-4 border-black p-8 md:p-12 shadow-brutal-xl max-w-4xl mx-auto mt-20 rotate-1">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 bg-brutal-yellow border-4 border-black flex items-center justify-center flex-shrink-0 shadow-brutal">
                    <Sparkles className="w-8 h-8 text-black" />
                </div>
                <div>
                    <p className="text-xs font-black text-black uppercase tracking-widest mb-4 bg-brutal-green border-2 border-black inline-block px-3 py-1">Daily Peaceful Quote</p>
                    <p className="font-heading text-2xl md:text-3xl text-black font-black leading-relaxed mb-6">
                        "You are stronger than you think, braver than you believe, and more loved than you know."
                    </p>
                    <p className="text-black font-bold italic">
                        — A.A. Milne
                    </p>
                </div>
            </div>
        </div>
    );
}
