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
        <div className="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* Left side: Profile Info */}
                <div className="flex items-start gap-5">
                    <div className="relative">
                        <img src={image} alt={name} className="w-20 h-20 rounded-xl object-cover border-2 border-gray-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-pastel-peach" />
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 border-2 border-gray-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            <div className="w-3 h-3 bg-pastel-mint-dark rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-heading font-black text-xl text-gray-900 mb-2">{name}</h3>
                        <div className="flex flex-wrap gap-2 items-center mb-3">
                            <span className="text-gray-900 font-bold text-xs bg-pastel-lavender/40 px-3 py-1.5 rounded-full border-2 border-gray-900 uppercase tracking-wide">{specialization}</span>
                            <div className="flex items-center gap-1 bg-pastel-peach/40 px-2 py-1.5 rounded-full border-2 border-gray-900">
                                <Star className="w-3 h-3 text-gray-900 fill-current" />
                                <span className="text-xs font-bold text-gray-900">{rating}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 font-bold bg-white/50 w-max px-2 py-1 rounded-lg border-2 border-gray-900 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                            <Clock className="w-4 h-4 text-gray-900" />
                            <span>{experience} Experience</span>
                        </div>
                    </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                    <button className="flex-1 md:flex-none uppercase tracking-wide bg-pastel-mint-dark text-white px-6 py-3 rounded-xl font-bold border-2 border-gray-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] transition-all flex items-center justify-center gap-2 active:shadow-none active:translate-y-[4px] active:translate-x-[4px]">
                        <Video className="w-5 h-5" />
                        Book Session
                    </button>
                    <button className="bg-white text-gray-900 p-3 rounded-xl border-2 border-gray-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-50 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] transition-all flex items-center justify-center active:shadow-none active:translate-y-[4px] active:translate-x-[4px]">
                        <MessageCircle className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
