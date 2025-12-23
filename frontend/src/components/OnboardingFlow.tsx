import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export default function OnboardingFlow() {
    const [step, setStep] = useState('age'); // age, concern, matching
    const [ageGroup, setAgeGroup] = useState(null);
    const [selectedConcern, setSelectedConcern] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
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

    const handleAgeSelect = (group) => {
        setAgeGroup(group);
        setStep('concern');
    };

    const handleConcernSelect = (concern) => {
        setSelectedConcern(concern);
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
                        className="max-w-3xl w-full text-center relative z-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-10 leading-tight drop-shadow-sm">
                            Are you a Teen or an Adult?
                        </h2>
                        <div className="grid grid-cols-2 gap-8">
                            <button
                                onClick={() => handleAgeSelect('Teen')}
                                className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl hover:shadow-[0_20px_40px_rgba(255,183,197,0.3)] transition-all transform hover:-translate-y-2 border border-white/60 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-pastel-peach/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="text-6xl mb-6 block transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">🎒</span>
                                <span className="text-2xl font-bold text-gray-700 group-hover:text-pastel-peach-dark transition-colors">Teen</span>
                            </button>
                            <button
                                onClick={() => handleAgeSelect('Adult')}
                                className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl hover:shadow-[0_20px_40px_rgba(175,238,238,0.3)] transition-all transform hover:-translate-y-2 border border-white/60 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-pastel-aqua/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="text-6xl mb-6 block transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">💼</span>
                                <span className="text-2xl font-bold text-gray-700 group-hover:text-pastel-aqua-dark transition-colors">Adult</span>
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
                        className="max-w-3xl w-full text-center relative z-10"
                    >
                        <h2 className="text-4xl font-heading font-bold text-gray-800 mb-10">
                            What are you currently <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-mint-dark to-pastel-aqua-dark">struggling with?</span>
                        </h2>
                        <div className="grid grid-cols-2 gap-5">
                            {concerns.map((concern, index) => (
                                <motion.button
                                    key={concern}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleConcernSelect(concern)}
                                    className="p-5 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm hover:shadow-lg transition-all text-left flex items-center justify-between group border border-white/60 hover:border-pastel-mint-dark hover:bg-white relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-pastel-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="font-semibold text-gray-700 group-hover:text-pastel-mint-dark relative z-10">{concern}</span>
                                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-pastel-mint-dark transition-all transform group-hover:translate-x-1 relative z-10" />
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
                        className="text-center relative z-10"
                    >
                        <div className="mb-10 relative flex justify-center">
                            <div className="absolute inset-0 bg-pastel-peach/30 rounded-full blur-xl animate-pulse"></div>
                            <div className="w-32 h-32 border-4 border-pastel-peach/30 border-t-pastel-peach-dark rounded-full animate-spin relative z-10"></div>
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="text-5xl animate-bounce">🌿</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-heading font-bold text-gray-800 mb-4">
                            Finding your safe space...
                        </h3>
                        <p className="text-gray-500 text-lg font-medium">
                            We found the best-matched psychologists for you.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
