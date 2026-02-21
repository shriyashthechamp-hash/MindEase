import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sprout, HandHeart, Send } from 'lucide-react';

interface Thought {
    id: string;
    content: string;
    timestamp: Date;
    reactions: {
        heart: number;
        support: number;
        same: number;
    };
}

const MOCK_THOUGHTS: Thought[] = [
    {
        id: '1',
        content: "I feel like everyone else has it figured out except me.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        reactions: { heart: 12, support: 5, same: 8 },
    },
    {
        id: '2',
        content: "Just took a deep breath for the first time today. It helps.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        reactions: { heart: 24, support: 2, same: 0 },
    },
    {
        id: '3',
        content: "Is it normal to feel lonely even when you're with friends?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
        reactions: { heart: 5, support: 15, same: 20 },
    },
    {
        id: '4',
        content: "passed my exam but still feel empty. weird.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        reactions: { heart: 8, support: 10, same: 4 },
    },
    {
        id: '5',
        content: "Reminder: drink water and unclench your jaw.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        reactions: { heart: 45, support: 0, same: 12 },
    },
];

export default function CommunityWall() {
    const [thoughts, setThoughts] = useState<Thought[]>(MOCK_THOUGHTS);
    const [newThought, setNewThought] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    // Load from local storage on mount (mock persistence)
    useEffect(() => {
        const saved = localStorage.getItem('mindease_thoughts');
        if (saved) {
            setThoughts(JSON.parse(saved).map((t: any) => ({
                ...t,
                timestamp: new Date(t.timestamp)
            })));
        }
    }, []);

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newThought.trim()) return;

        setIsPosting(true);

        // Simulate API delay
        setTimeout(() => {
            const thought: Thought = {
                id: Date.now().toString(),
                content: newThought.trim(),
                timestamp: new Date(),
                reactions: { heart: 0, support: 0, same: 0 },
            };

            const updatedThoughts = [thought, ...thoughts];
            setThoughts(updatedThoughts);
            localStorage.setItem('mindease_thoughts', JSON.stringify(updatedThoughts));
            setNewThought('');
            setIsPosting(false);
        }, 800);
    };

    const reactToThought = (id: string, type: 'heart' | 'support' | 'same') => {
        const updated = thoughts.map(t => {
            if (t.id === id) {
                return {
                    ...t,
                    reactions: {
                        ...t.reactions,
                        [type]: t.reactions[type] + 1
                    }
                };
            }
            return t;
        });
        setThoughts(updated);
        localStorage.setItem('mindease_thoughts', JSON.stringify(updated));
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans">

            {/* Input Area */}
            <div className="mb-12">
                <div className="bg-white border-2 border-black shadow-brutal-sm p-6 relative">
                    <h3 className="text-xl font-bold font-heading mb-4">Quiet Thoughts</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Share what's on your mind. Anonymous. Safe. Max 150 chars.
                    </p>
                    <form onSubmit={handlePost}>
                        <textarea
                            value={newThought}
                            onChange={(e) => setNewThought(e.target.value)}
                            maxLength={150}
                            placeholder="I'm feeling..."
                            className="w-full p-4 bg-brutal-cream/30 border-2 border-black focus:outline-none focus:shadow-brutal-sm transition-all resize-none h-32 font-mono text-sm"
                        />
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-gray-400">
                                {newThought.length}/150
                            </span>
                            <button
                                type="submit"
                                disabled={!newThought.trim() || isPosting}
                                className="px-6 py-2 bg-brutal-green border-2 border-black font-bold uppercase text-sm shadow-[2px_2px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isPosting ? 'Posting...' : (
                                    <>Send <Send className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Thoughts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {thoughts.map((thought) => (
                        <motion.div
                            key={thought.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className="bg-white border-2 border-black shadow-brutal p-6 flex flex-col justify-between"
                        >
                            <div className="mb-6">
                                <p className="font-mono text-sm leading-relaxed text-gray-800">
                                    "{thought.content}"
                                </p>
                                <p className="text-xs text-gray-400 mt-4 text-right">
                                    {new Intl.DateTimeFormat('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    }).format(thought.timestamp)}
                                </p>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-gray-200">
                                <div className="flex gap-4">
                                    <ReactionButton
                                        count={thought.reactions.heart}
                                        icon={<Heart className="w-4 h-4" />}
                                        onClick={() => reactToThought(thought.id, 'heart')}
                                        label="Relate"
                                    />
                                    <ReactionButton
                                        count={thought.reactions.support}
                                        icon={<Sprout className="w-4 h-4" />}
                                        onClick={() => reactToThought(thought.id, 'support')}
                                        label="Support"
                                    />
                                    <ReactionButton
                                        count={thought.reactions.same}
                                        icon={<HandHeart className="w-4 h-4" />}
                                        onClick={() => reactToThought(thought.id, 'same')}
                                        label="Same"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ReactionButton({ count, icon, onClick, label }: { count: number, icon: React.ReactNode, onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-1 group"
            title={label}
        >
            <div className="p-2 rounded-full hover:bg-gray-100 transition-colors group-active:scale-90 duration-100">
                {icon}
            </div>
            <span className="text-[10px] font-bold text-gray-500">{count}</span>
        </button>
    );
}
