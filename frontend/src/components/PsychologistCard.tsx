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
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-50">
            <div className="flex items-start gap-4 mb-4">
                <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                    <h3 className="font-heading font-bold text-lg text-gray-800">{name}</h3>
                    <p className="text-pastel-blue font-medium text-sm">{specialization}</p>
                    <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{rating}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Clock className="w-4 h-4" />
                <span>{experience} Experience</span>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 bg-pastel-blue text-white py-2 rounded-xl font-medium hover:bg-pastel-blue/90 transition-colors flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" />
                    Book
                </button>
                <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
