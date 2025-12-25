"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ExperienceLightboxProps {
    images: string[];
    isOpen: boolean;
    startIndex: number;
    onClose: () => void;
}

export function ExperienceLightbox({
    images,
    isOpen,
    startIndex,
    onClose,
}: ExperienceLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    useEffect(() => {
        setCurrentIndex(startIndex);
    }, [startIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                >
                    <X className="w-8 h-8 font-light" />
                </button>

                <div className="relative w-full h-full flex items-center justify-center">
                    <button
                        onClick={handlePrevious}
                        className="absolute left-0 z-10 p-4 text-white/30 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-12 h-12" />
                    </button>

                    <div className="relative w-full max-w-6xl h-full flex items-center justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={images[currentIndex]}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="max-w-full max-h-full object-contain pointer-events-auto shadow-2xl"
                            />
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 z-10 p-4 text-white/30 hover:text-white transition-colors"
                    >
                        <ChevronRight className="w-12 h-12" />
                    </button>
                </div>

                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <p className="text-white/50 text-sm tracking-[0.2em] uppercase">
                        {currentIndex + 1} <span className="mx-2">/</span> {images.length}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
