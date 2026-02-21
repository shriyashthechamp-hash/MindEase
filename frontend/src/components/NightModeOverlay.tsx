import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, X } from 'lucide-react';

export default function NightModeOverlay() {
    const [isNight, setIsNight] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const hour = new Date().getHours();
            // Night is considered from 9 PM (21) to 6 AM (6)
            const isNightTime = hour >= 21 || hour < 6;
            setIsNight(isNightTime);

            // Only show banner if it hasn't been dismissed in this session
            const hasDismissed = sessionStorage.getItem('mindease_night_dismissed');
            if (isNightTime && !hasDismissed) {
                // Delay slightly for effect
                setTimeout(() => setShowBanner(true), 2000);
            }
        };

        checkTime();
        // Check every minute
        const interval = setInterval(checkTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const dismissBanner = () => {
        setShowBanner(false);
        sessionStorage.setItem('mindease_night_dismissed', 'true');
    };

    if (!isNight) return null;

    return (
        <>
            {/* Visual Overlay - Darkens the screen without blocking interaction */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-indigo-900 mix-blend-multiply opacity-20 transition-opacity duration-1000" />

            {/* Night Banner */}
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
                    >
                        <div className="bg-indigo-950 text-indigo-100 p-6 shadow-2xl border-2 border-indigo-400/30 rounded-lg backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2">
                                <button onClick={dismissBanner} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-900/50 rounded-full border border-indigo-500/30">
                                    <Moon className="w-6 h-6 text-indigo-300" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-lg mb-1 text-indigo-50">Late night?</h4>
                                    <p className="text-sm text-indigo-200 mb-4 leading-relaxed">
                                        Thoughts can get louder when it's quiet. You're not alone.
                                    </p>
                                    <div className="flex gap-3">
                                        <a href="/quiet-thoughts" className="text-xs font-bold uppercase tracking-wide px-3 py-2 bg-indigo-800 hover:bg-indigo-700 transition-colors rounded border border-indigo-500/30">
                                            Drop a thought
                                        </a>
                                        <a href="/chat" className="text-xs font-bold uppercase tracking-wide px-3 py-2 bg-transparent hover:bg-white/5 transition-colors rounded border border-indigo-500/30">
                                            Chat
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
