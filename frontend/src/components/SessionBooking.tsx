import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, Star } from 'lucide-react';

const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
];

const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push({
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d.toISOString().split('T')[0]
        });
    }
    return dates;
};

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5000';

export default function SessionBooking() {
    const [psychologists, setPsychologists] = useState<any[]>([]);
    const [selectedPsychologist, setSelectedPsychologist] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState(generateDates()[0]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isBooked, setIsBooked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        fetch(`${API_URL}/api/psychologists`)
            .then(res => res.json())
            .then(data => {
                setPsychologists(data);
                if (data.length > 0) setSelectedPsychologist(data[0]);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch psychologists", err);
                // Fallback data if backend is down
                const fallback = [
                    { id: 1, name: "Dr. Sarah Chen", specialization: "Anxiety & Stress", image: "👩‍⚕️", rating: 4.9 },
                    { id: 2, name: "Dr. James Wilson", specialty: "Depression & Mood", image: "👨‍⚕️", rating: 4.8 },
                ];
                setPsychologists(fallback);
                setSelectedPsychologist(fallback[0]);
                setIsLoading(false);
            });
    }, []);

    const handleBooking = async () => {
        if (!selectedPsychologist || !selectedDate || !selectedTime) return;

        try {
            const response = await fetch(`${API_URL}/api/sessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    psychologistId: selectedPsychologist.id,
                    date: selectedDate.fullDate,
                    time: selectedTime,
                    type: 'Video'
                })
            });

            if (response.ok) {
                setIsBooked(true);
                setTimeout(() => setIsBooked(false), 3000);
            } else {
                alert("Failed to book session. Please try again.");
            }
        } catch (error) {
            console.error("Booking error", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-4xl font-heading font-bold text-gray-800 mb-2">Book a Session</h1>
                <p className="text-gray-600">Take the next step in your journey to wellness.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column: Selection */}
                <div className="space-y-8">
                    {/* Psychologist Selection */}
                    <section>
                        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-500" /> Select Psychologist
                        </h3>
                        <div className="space-y-3">
                            {isLoading ? (
                                <div className="p-4 text-center text-gray-500">Loading...</div>
                            ) : (
                                psychologists.map((psych) => (
                                    <motion.button
                                        key={psych.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedPsychologist(psych)}
                                        className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all border ${selectedPsychologist?.id === psych.id
                                            ? 'bg-white shadow-lg border-purple-400 ring-2 ring-purple-100'
                                            : 'bg-white/50 hover:bg-white border-transparent hover:shadow-md'
                                            }`}
                                    >
                                        <span className="text-4xl bg-gray-50 rounded-full p-2">{psych.image}</span>
                                        <div className="text-left flex-1">
                                            <h4 className="font-bold text-gray-800">{psych.name}</h4>
                                            <p className="text-sm text-gray-500">{psych.specialization}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                                            <Star className="w-4 h-4 fill-current" /> {psych.rating}
                                        </div>
                                    </motion.button>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Date Selection */}
                    <section>
                        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-rose-500" /> Select Date
                        </h3>
                        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                            {generateDates().map((date, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedDate(date)}
                                    className={`flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border ${selectedDate.fullDate === date.fullDate
                                        ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200'
                                        : 'bg-white/60 hover:bg-white text-gray-600 border-white/50'
                                        }`}
                                >
                                    <span className="text-xs font-medium uppercase tracking-wider opacity-80">{date.day}</span>
                                    <span className="text-2xl font-bold">{date.date}</span>
                                </motion.button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Time & Confirmation */}
                <div className="space-y-8">
                    {/* Time Selection */}
                    <section>
                        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-cyan-500" /> Select Time
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {timeSlots.map((time) => (
                                <motion.button
                                    key={time}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all border ${selectedTime === time
                                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-200'
                                        : 'bg-white/60 hover:bg-white text-gray-600 border-white/50'
                                        }`}
                                >
                                    {time}
                                </motion.button>
                            ))}
                        </div>
                    </section>

                    {/* Summary Card */}
                    <motion.div
                        className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/60 relative overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>

                        <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>
                        <div className="space-y-3 text-gray-600 mb-6">
                            <div className="flex justify-between items-center">
                                <span>Psychologist</span>
                                <span className="font-semibold text-gray-800">{selectedPsychologist?.name || 'Select a Psychologist'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Date</span>
                                <span className="font-semibold text-gray-800">{selectedDate.day}, {selectedDate.date}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Time</span>
                                <span className={`font-semibold ${selectedTime ? 'text-gray-800' : 'text-gray-400 italic'}`}>
                                    {selectedTime || 'Select a time'}
                                </span>
                            </div>
                            <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-bold text-lg text-gray-800">
                                <span>Total</span>
                                <span>$120</span>
                            </div>
                        </div>

                        <button
                            disabled={!selectedTime || isBooked}
                            onClick={handleBooking}
                            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 ${!selectedTime
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : isBooked
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-xl'
                                }`}
                        >
                            {isBooked ? (
                                <>
                                    <CheckCircle className="w-6 h-6 animate-bounce" /> Booked Successfully!
                                </>
                            ) : (
                                'Confirm Booking'
                            )}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Success Overlay Animation */}
            <AnimatePresence>
                {isBooked && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
                    >
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="bg-white p-8 rounded-3xl shadow-2xl text-center relative z-10"
                        >
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Session Confirmed!</h2>
                            <p className="text-gray-600">You're all set with {selectedPsychologist?.name}.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
