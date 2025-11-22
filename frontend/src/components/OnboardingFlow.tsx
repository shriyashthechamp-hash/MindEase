import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const concerns = [
    "Exam Stress",
    "Anxiety",
    "Work Pressure",
    "Depression",
    "Relationship Stress",
    "Overthinking"
];

export default function OnboardingFlow() {
    const [step, setStep] = useState<'age' | 'concern' | 'matching'>('age');
    const [ageGroup, setAgeGroup] = useState<'Teen' | 'Adult' | null>(null);
    const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

    const handleAgeSelect = (group: 'Teen' | 'Adult') => {
        setAgeGroup(group);
        setStep('concern');
    };

    const handleConcernSelect = (concern: string) => {
        setSelectedConcern(concern);
        setStep('matching');
        // Simulate matching process then redirect
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 3000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <AnimatePresence mode="wait">
                {step === 'age' && (
                    <motion.div
                        key="age"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-md w-full text-center"
                    >
                        <h2 className="text-3xl font-heading font-bold text-pastel-text mb-8">
                            Are you a Teen or an Adult?
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <button
                                onClick={() => handleAgeSelect('Teen')}
                                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-pastel-blue group"
                            >
                                <span className="text-4xl mb-4 block">🎒</span>
                                <span className="text-xl font-semibold text-gray-700 group-hover:text-pastel-blue">Teen</span>
                            </button>
                            <button
                                onClick={() => handleAgeSelect('Adult')}
                                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-pastel-peach group"
                            >
                                <span className="text-4xl mb-4 block">💼</span>
                                <span className="text-xl font-semibold text-gray-700 group-hover:text-pastel-peach">Adult</span>
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 'concern' && (
                    <motion.div
                        key="concern"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-lg w-full text-center"
                    >
                        <h2 className="text-3xl font-heading font-bold text-pastel-text mb-8">
                            What are you currently struggling with?
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {concerns.map((concern) => (
                                <button
                                    key={concern}
                                    onClick={() => handleConcernSelect(concern)}
                                    className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between group border border-gray-100 hover:border-pastel-green"
                                >
                                    <span className="font-medium text-gray-700 group-hover:text-pastel-green">{concern}</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-pastel-green transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 'matching' && (
                    <motion.div
                        key="matching"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="mb-8 relative">
                            <div className="w-24 h-24 mx-auto border-4 border-pastel-blue/30 border-t-pastel-blue rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">🌿</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-heading font-semibold text-pastel-text mb-2">
                            Finding your safe space...
                        </h3>
                        <p className="text-gray-500">
                            We found the best-matched psychologists for you.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
