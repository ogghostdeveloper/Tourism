"use client";

import { motion } from "framer-motion";

import { press } from "@/lib/data";

export function Press() {
    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-12">
                    As Featured In
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale">
                    {press.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-xl md:text-2xl font-serif italic"
                        >
                            {item.name}
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}
