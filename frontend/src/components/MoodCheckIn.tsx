import React, { useState } from 'react';
import { Smile, Frown, Meh, CloudRain, Sun } from 'lucide-react';

const moods = [
    { icon: Sun, label: 'Great', color: 'text-yellow-400' },
    { icon: Smile, label: 'Good', color: 'text-pastel-green' },
    { icon: Meh, label: 'Okay', color: 'text-pastel-blue' },
    { icon: Frown, label: 'Low', color: 'text-pastel-peach' },
    { icon: CloudRain, label: 'Bad', color: 'text-gray-400' },
];

export default function MoodCheckIn() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <h3 className="font-heading font-bold text-lg text-gray-800 mb-4">How are you feeling today?</h3>
            <div className="flex justify-between items-center">
                {moods.map((mood) => (
                    <button
                        key={mood.label}
                        onClick={() => setSelectedMood(mood.label)}
                        className={`flex flex-col items-center gap-2 transition-transform hover:-translate-y-1 ${selectedMood === mood.label ? 'scale-110' : 'opacity-70 hover:opacity-100'
                            }`}
                    >
                        <mood.icon className={`w-8 h-8 ${mood.color}`} />
                        <span className="text-xs font-medium text-gray-500">{mood.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
