import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, PenTool } from 'lucide-react';

const moods = [
    { label: 'overwhelmed', color: 'bg-brutal-pink' },
    { label: 'okay', color: 'bg-brutal-green' },
    { label: 'numb', color: 'bg-gray-300' },
    { label: 'calm', color: 'bg-brutal-blue' },
    { label: 'anxious', color: 'bg-brutal-orange' },
    { label: 'tired', color: 'bg-brutal-purple' },
];

export default function MoodCheckIn() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    return (
        <section className="py-12 bg-brutal-cream font-sans">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto bg-white border-2 border-black shadow-brutal-sm p-8 rounded-none">
                    <AnimatePresence mode="wait">
                        {!selectedMood ? (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="text-center"
                            >
                                <h2 className="text-2xl font-bold font-heading mb-6 lowercase">
                                    How are you feeling right now?
                                </h2>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {moods.map((mood) => (
                                        <motion.button
                                            key={mood.label}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedMood(mood.label)}
                                            className={`
                        px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_#000000]
                        hover:shadow-[4px_4px_0px_0px_#000000] transition-all
                        font-medium text-sm lowercase tracking-wide
                        ${mood.color}
                      `}
                                        >
                                            {mood.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="text-center"
                            >
                                <h3 className="text-xl font-bold mb-2">
                                    It's okay to feel {selectedMood}.
                                </h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm">
                                    We're here for you. Take a deep breath. What would help you right now?
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button className="flex flex-col items-center p-4 border-2 border-black hover:bg-gray-50 transition-colors group">
                                        <PenTool className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-bold">Write a thought</span>
                                    </button>

                                    <a href="/quiet-thoughts" className="flex flex-col items-center p-4 border-2 border-black hover:bg-gray-50 transition-colors group">
                                        <Heart className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform text-brutal-pink" />
                                        <span className="text-sm font-bold">You're not alone</span>
                                    </a>

                                    <a href="/chat" className="flex flex-col items-center p-4 border-2 border-black hover:bg-gray-50 transition-colors group">
                                        <MessageCircle className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform text-brutal-blue" />
                                        <span className="text-sm font-bold">Talk to someone</span>
                                    </a>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={() => setSelectedMood(null)}
                                        className="text-xs text-gray-500 underline hover:text-black"
                                    >
                                        Check in again
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
