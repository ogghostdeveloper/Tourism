"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { ArrowRight, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin123");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid credentials");
            } else {
                toast.success("Welcome back, Admin");
                router.push("/admin/experiences");
                router.refresh();
            }
        } catch (error) {
            toast.error("An error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Animated Geometric Shapes */}
            <motion.div
                className="absolute top-20 left-10 w-32 h-32 bg-white/5 border border-white/10"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-40 right-20 w-24 h-24 bg-white/5 border border-white/10"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/5 border border-white/10"
                animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-40 right-1/3 w-28 h-28 bg-white/5 border border-white/10"
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Scan Line Effect */}
            <motion.div
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                    y: [0, 1000],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Main Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white border-2 border-gray-900 shadow-2xl relative z-10"
            >
                {/* Header with animated border */}
                <div className="relative border-b-2 border-gray-900 p-8 bg-gradient-to-br from-gray-50 to-white">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-black"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 relative"
                        >
                            <Shield className="w-8 h-8" />
                            <motion.div
                                className="absolute inset-0 border-2 border-black"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />
                        </motion.div>
                        <h1 className="text-3xl font-light text-black mb-2 tracking-wider">ADMIN PORTAL</h1>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Secure Access</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-3">
                            <label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                                Username
                            </label>
                            <div className="relative group">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full border-b-2 border-gray-300 py-3 text-sm text-black focus:outline-none focus:border-black transition-all bg-transparent group-hover:border-gray-400"
                                    placeholder="Enter username"
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-black"
                                    initial={{ scaleX: 0 }}
                                    whileFocus={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3">
                            <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                                Password
                            </label>
                            <div className="relative group">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border-b-2 border-gray-300 py-3 pr-12 text-sm text-black focus:outline-none focus:border-black transition-all bg-transparent group-hover:border-gray-400"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                className={cn(
                                    "w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative overflow-hidden group",
                                    isLoading && "opacity-70 cursor-not-allowed"
                                )}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                    style={{ opacity: 0.1 }}
                                />
                                <span className="relative z-10">{isLoading ? "SIGNING IN..." : "SIGN IN"}</span>
                                {!isLoading && <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
                            </motion.button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t-2 border-gray-100">
                        <p className="text-xs text-center text-gray-400 uppercase tracking-wider">
                            Bhutan Tourism © 2025
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
