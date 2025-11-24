import React from 'react';
import { Star, Clock, Video, MessageCircle } from 'lucide-react';

interface PsychologistProps {
    name: string;
    specialization: string;
    experience: string;
    rating: number;
    image: string;
}

export default function PsychologistCard({ name, specialization, experience, rating, image }: PsychologistProps) {
    return (
        <div className="glass-card rounded-[2rem] p-6 group relative overflow-hidden">
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-pastel-peach/10 to-pastel-aqua/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex items-start gap-5 mb-6 relative z-10">
                <div className="relative">
                    <div className="absolute inset-0 bg-pastel-peach rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <img src={image} alt={name} className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:shadow-lg transition-all transform group-hover:scale-105" />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-white/50">
                        <div className="w-3 h-3 bg-pastel-mint-dark rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div>
                    <h3 className="font-heading font-bold text-xl text-gray-800 mb-1 group-hover:text-pastel-peach-dark transition-colors">{name}</h3>
                    <p className="text-pastel-lavender-dark font-semibold text-sm bg-pastel-lavender/20 px-3 py-1 rounded-full inline-block border border-pastel-lavender/30">{specialization}</p>
                    <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm" />
                        <span className="text-sm font-bold text-gray-700">{rating}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-white/50 p-3 rounded-2xl border border-white/40">
                <Clock className="w-4 h-4 text-pastel-aqua-dark" />
                <span>{experience} Experience</span>
            </div>

            <div className="flex gap-3 relative z-10">
                <button className="flex-1 btn-gradient py-3 rounded-2xl font-bold flex items-center justify-center gap-2 glow-hover">
                    <Video className="w-4 h-4" />
                    Book Session
                </button>
                <button className="p-3 rounded-2xl border-2 border-white/60 bg-white/40 hover:bg-white hover:border-pastel-lavender-dark text-pastel-lavender-dark transition-all hover:shadow-md hover:-translate-y-1">
                    <MessageCircle className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
