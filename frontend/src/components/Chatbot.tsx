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

    const fetchAIResponse = async (userMessage: string) => {
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.PUBLIC_OPENROUTER_API_KEY || ''}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "mistralai/mistral-7b-instruct",
                    messages: [
                        {
                            role: "system",
                            content: "You are MindEase AI, a calm, soft, emotionally supportive Gen-Z mental wellness companion. Validate feelings gently. Never diagnose medical conditions."
                        },
                        {
                            role: "user",
                            content: userMessage
                        }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("AI Fetch Error:", error);
            return "I'm so sorry, but I'm having a little trouble connecting right now. Please take a deep breath and try again in a moment. 🌿";
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userText = input.trim();
        const userMessage: Message = { id: Date.now(), text: userText, sender: 'user' };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        const aiText = await fetchAIResponse(userText);

        const botResponse: Message = {
            id: Date.now() + 1,
            text: aiText,
            sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
    };

    return (
        <div className="flex flex-col h-[600px] bg-white border-2 border-gray-900 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-[2.5rem] overflow-hidden">
            {/* Header */}
            <div className="bg-pastel-lavender/40 p-5 flex items-center gap-4 border-b-2 border-gray-900">
                <div className="w-14 h-14 bg-pastel-peach rounded-2xl border-2 border-gray-900 flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-3">
                    <Bot className="w-8 h-8 text-gray-900" />
                </div>
                <div>
                    <h3 className="font-heading font-black text-gray-900 text-xl uppercase tracking-tight">MindMate</h3>
                    <p className="text-xs text-gray-700 flex items-center gap-1.5 font-bold uppercase tracking-wide">
                        <span className="w-2 h-2 bg-green-400 border border-gray-900 rounded-full animate-pulse shadow-[1px_1px_0px_rgba(0,0,0,1)]"></span>
                        Always here for you
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 scroll-smooth">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] p-5 text-base font-medium border-2 border-gray-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] ${msg.sender === 'user'
                                ? 'bg-gray-900 text-white rounded-[2rem] rounded-tr-none'
                                : 'bg-white text-gray-900 rounded-[2rem] rounded-tl-none'
                                }`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white p-5 rounded-[2rem] rounded-tl-none shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-gray-900 flex items-center gap-2 h-[60px]">
                                <span className="w-3 h-3 bg-gray-900 rounded-full animate-bounce"></span>
                                <span className="w-3 h-3 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-3 h-3 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-white border-t-2 border-gray-900">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Tell me what's on your mind today..."
                        disabled={isTyping}
                        className="flex-1 p-4 rounded-xl border-2 border-gray-900 bg-white focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 font-bold text-gray-900 disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isTyping || !input.trim()}
                        className="p-4 bg-pastel-mint-dark text-white rounded-xl border-2 border-gray-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 flex items-center justify-center group disabled:translate-y-0 disabled:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    >
                        <Send className="w-6 h-6 transform group-hover:-rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
