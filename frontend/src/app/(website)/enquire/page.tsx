"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EnquirePage() {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        destination: "Bhutan",
        travelDate: "",
        travelers: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full text-center space-y-8"
                >
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto text-white">
                        <Check className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-light tracking-tight text-black">Thank You</h1>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        We have received your enquiry. One of our travel experts will be in touch with you shortly to start planning your journey to Bhutan.
                    </p>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider border-b border-black pb-1 hover:text-gray-600 transition-colors"
                    >
                        Return Home <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 text-center mb-20"
                >
                    <span className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase block">
                        Start Your Journey
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black">
                        Begin Your Bhutan Adventure
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Tell us about your dream trip to the Kingdom of Happiness. Our travel specialists will craft a bespoke itinerary just for you.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                value={formState.firstName}
                                onChange={handleChange}
                                className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder:text-gray-300"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                value={formState.lastName}
                                onChange={handleChange}
                                className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder:text-gray-300"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formState.email}
                                onChange={handleChange}
                                className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder:text-gray-300"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formState.phone}
                                onChange={handleChange}
                                className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder:text-gray-300"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <label htmlFor="travelers" className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Number of Travelers
                            </label>
                            <select
                                id="travelers"
                                name="travelers"
                                value={formState.travelers}
                                onChange={handleChange}
                                className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-gray-900"
                            >
                                <option value="">Select number of travelers</option>
                                <option value="1">1 Traveler</option>
                                <option value="2">2 Travelers</option>
                                <option value="3-4">3-4 Travelers</option>
                                <option value="5-8">5-8 Travelers</option>
                                <option value="9+">9+ Travelers</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="travelDate" className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Preferred Travel Date
                            </label>
                            <input
                                type="text"
                                id="travelDate"
                                name="travelDate"
                                value={formState.travelDate}
                                onChange={handleChange}
                                className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder:text-gray-300"
                                placeholder="e.g., October 2024"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            Tell us about your trip
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formState.message}
                            onChange={handleChange}
                            className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent rounded-none resize-none placeholder:text-gray-300"
                            placeholder="Any specific interests, destinations, or requirements?"
                        />
                    </div>

                    <div className="pt-8 flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "bg-black text-white px-12 py-5 text-sm font-medium uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-4",
                                isSubmitting && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {isSubmitting ? "Sending..." : "Send Enquiry"}
                            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
