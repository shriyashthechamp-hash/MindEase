import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export default function OnboardingFlow() {
    const [step, setStep] = useState('age'); // age, concern, matching
    const [ageGroup, setAgeGroup] = useState(null);
    const [selectedConcern, setSelectedConcern] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            setMousePosition({
                x: e.clientX - window.innerWidth / 2,
                y: e.clientY - window.innerHeight / 2
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const concerns = [
        "Anxiety & Stress", "Depression", "Relationship Issues",
        "Career Guidance", "Sleep Problems", "Self-Esteem"
    ];

    const handleAgeSelect = (group: string) => {
        setAgeGroup(group as any);
        setStep('concern');
    };

    const handleConcernSelect = (concern: string) => {
        setSelectedConcern(concern as any);
        setStep('matching');
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 3000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 overflow-hidden relative bg-gradient-to-br from-rose-100 via-purple-100 to-cyan-100">
            {/* Interactive Vibrant Background Blobs */}
            <motion.div
                animate={{ x: mousePosition.x * -0.02, y: mousePosition.y * -0.02 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/30 rounded-full blur-[100px] mix-blend-multiply"
            ></motion.div>
            <motion.div
                animate={{ x: mousePosition.x * 0.03, y: mousePosition.y * 0.03 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[100px] mix-blend-multiply"
            ></motion.div>
            <motion.div
                animate={{ x: mousePosition.x * -0.04, y: mousePosition.y * -0.04 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] bg-cyan-500/30 rounded-full blur-[100px] mix-blend-multiply"
            ></motion.div>
            <motion.div
                animate={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-yellow-400/30 rounded-full blur-[100px] mix-blend-multiply"
            ></motion.div>

            <AnimatePresence mode="wait">
                {step === 'age' && (
                    <motion.div
                        key="age"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                        className="max-w-3xl w-full text-center relative z-10 bg-white border-2 border-gray-900 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-[2rem] p-10 mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 mb-10 leading-tight">
                            Are you a <span className="bg-pastel-peach px-4 py-2 rounded-xl border-2 border-gray-900 inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-2">Teen</span> or an <span className="bg-pastel-aqua px-4 py-2 rounded-xl border-2 border-gray-900 inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-2 mt-2 md:mt-0">Adult?</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <button
                                onClick={() => handleAgeSelect('Teen')}
                                className="p-8 rounded-2xl bg-white border-2 border-gray-900 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:bg-pastel-peach/30 transition-all flex flex-col items-center justify-center group"
                            >
                                <span className="text-6xl mb-6 block transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">🎒</span>
                                <span className="text-2xl font-black text-gray-900 uppercase tracking-wide">Teen</span>
                            </button>
                            <button
                                onClick={() => handleAgeSelect('Adult')}
                                className="p-8 rounded-2xl bg-white border-2 border-gray-900 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:bg-pastel-aqua/30 transition-all flex flex-col items-center justify-center group"
                            >
                                <span className="text-6xl mb-6 block transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">💼</span>
                                <span className="text-2xl font-black text-gray-900 uppercase tracking-wide">Adult</span>
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 'concern' && (
                    <motion.div
                        key="concern"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="max-w-4xl w-full text-center relative z-10 bg-white border-2 border-gray-900 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-[2rem] p-10 mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 mb-10 leading-tight">
                            What are you currently <br className="hidden md:block" />
                            <span className="bg-pastel-mint px-4 py-2 rounded-xl border-2 border-gray-900 inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)] mt-4">struggling with?</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {concerns.map((concern, index) => (
                                <motion.button
                                    key={concern}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleConcernSelect(concern)}
                                    className="p-5 rounded-2xl bg-white text-gray-900 font-bold border-2 border-gray-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] transition-all text-left flex items-center justify-between group hover:bg-pastel-mint/20"
                                >
                                    <span className="text-lg">{concern}</span>
                                    <ArrowRight className="w-6 h-6 text-gray-900 transition-transform transform group-hover:translate-x-2" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 'matching' && (
                    <motion.div
                        key="matching"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-xl w-full text-center relative z-10 bg-white border-2 border-gray-900 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-[2rem] p-12 mx-auto"
                    >
                        <div className="mb-10 relative flex justify-center">
                            <div className="w-32 h-32 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin relative z-10 shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-pastel-peach/30"></div>
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="text-5xl animate-bounce">🌿</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-heading font-black text-gray-900 mb-6 uppercase tracking-tight">
                            Finding your safe space...
                        </h3>
                        <p className="text-gray-900 text-lg font-bold border-2 border-gray-900 bg-pastel-lavender/40 inline-block px-5 py-3 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            Matching with best specialists
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
