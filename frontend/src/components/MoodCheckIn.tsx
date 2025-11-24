import React, { useState } from 'react';
import { Smile, Frown, Meh, CloudRain, Sun } from 'lucide-react';

const moods = [
    { icon: Sun, label: 'Great', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { icon: Smile, label: 'Good', color: 'text-pastel-green-dark', bg: 'bg-pastel-green/20' },
    { icon: Meh, label: 'Okay', color: 'text-pastel-blue-dark', bg: 'bg-pastel-blue/20' },
    { icon: Frown, label: 'Low', color: 'text-pastel-peach-dark', bg: 'bg-pastel-peach/20' },
    { icon: CloudRain, label: 'Bad', color: 'text-gray-400', bg: 'bg-gray-100' },
];

export default function MoodCheckIn() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    return (
        <div className="glass-panel rounded-3xl p-6">
            <h3 className="font-heading font-bold text-lg text-gray-800 mb-6">How are you feeling today?</h3>
            <div className="flex justify-between items-center px-2">
                {moods.map((mood) => (
                    <button
                        key={mood.label}
                        onClick={() => setSelectedMood(mood.label)}
                        className={`flex flex-col items-center gap-3 transition-all duration-300 group ${selectedMood === mood.label ? 'scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'
                            }`}
                    >
                        <div className={`p-3 rounded-2xl ${mood.bg} transition-colors group-hover:shadow-md`}>
                            <mood.icon className={`w-6 h-6 ${mood.color}`} />
                        </div>
                        <span className={`text-xs font-semibold ${selectedMood === mood.label ? 'text-gray-800' : 'text-gray-500'}`}>
                            {mood.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
