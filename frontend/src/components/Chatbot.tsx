import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi, I’m MindMate 🌿 I’m here for you. How’s your mind feeling today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: getMockResponse(input),
                sender: 'bot'
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getMockResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('anxiety') || lowerText.includes('anxious')) {
            return "I hear you. Anxiety can be overwhelming. Try taking a deep breath with me... Inhale for 4 seconds, hold for 7, and exhale for 8. Would you like to try a guided breathing exercise?";
        }
        if (lowerText.includes('sad') || lowerText.includes('depressed')) {
            return "I'm sorry you're feeling this way. It's okay to not be okay. Remember, this feeling is temporary. Have you considered speaking with one of our specialists?";
        }
        if (lowerText.includes('stress') || lowerText.includes('work')) {
            return "Work pressure is tough. Remember to prioritize yourself. Have you taken a small break today?";
        }
        return "Thank you for sharing that with me. I'm here to listen and support you. Tell me more about how that makes you feel.";
    };

    return (
        <div className="flex flex-col h-[600px] glass-panel rounded-[2.5rem] overflow-hidden border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            {/* Header */}
            <div className="bg-white/60 backdrop-blur-md p-5 flex items-center gap-4 border-b border-white/30">
                <div className="w-14 h-14 bg-gradient-to-br from-pastel-peach-dark to-pastel-lavender-dark rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/50">
                    <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h3 className="font-heading font-bold text-gray-800 text-xl">MindMate</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 font-semibold uppercase tracking-wide">
                        <span className="w-2 h-2 bg-pastel-mint-dark rounded-full animate-pulse"></span>
                        Always here for you
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/30 scroll-smooth">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-5 rounded-3xl shadow-sm ${msg.sender === 'user'
                                ? 'bg-gradient-to-r from-pastel-peach-dark to-pastel-lavender-dark text-white rounded-tr-none shadow-pastel-peach/30'
                                : 'bg-white/80 backdrop-blur-sm text-gray-700 rounded-tl-none border border-white/60 shadow-sm'
                            }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-white/80 p-5 rounded-3xl rounded-tl-none shadow-sm border border-white/60 flex gap-2">
                            <span className="w-2.5 h-2.5 bg-pastel-peach-dark rounded-full animate-bounce"></span>
                            <span className="w-2.5 h-2.5 bg-pastel-peach-dark rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2.5 h-2.5 bg-pastel-peach-dark rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-white/70 backdrop-blur-md border-t border-white/30">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 p-4 rounded-2xl border border-white/60 bg-white/60 focus:outline-none focus:border-pastel-peach-dark focus:ring-2 focus:ring-pastel-peach/20 transition-all placeholder-gray-400 text-gray-700"
                    />
                    <button
                        onClick={handleSend}
                        className="p-4 bg-gradient-to-r from-pastel-peach-dark to-pastel-lavender-dark text-white rounded-2xl hover:shadow-lg hover:shadow-pastel-peach/40 transform hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
