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

        // Simulate AI delay
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
        <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-pastel-lavender/30 p-4 flex items-center gap-3 border-b border-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Bot className="w-6 h-6 text-pastel-blue" />
                </div>
                <div>
                    <h3 className="font-heading font-bold text-gray-700">MindMate</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Always here for you
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'user'
                                ? 'bg-pastel-green/20 text-gray-800 rounded-tr-none'
                                : 'bg-white text-gray-700 shadow-sm rounded-tl-none border border-gray-100'
                            }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
                            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pastel-blue focus:ring-1 focus:ring-pastel-blue/50 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        className="p-3 bg-pastel-blue text-white rounded-xl hover:bg-pastel-blue/90 transition-colors shadow-sm hover:shadow-md"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
