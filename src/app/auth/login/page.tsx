"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import { useUser } from "@/context/UserContext";
import { IoEyeOutline, IoEyeOffOutline, IoAlertCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; name?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    login({ email, name });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f1a] flex flex-col font-inter">
      <NavBar />
      
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-[#111827]/80 backdrop-blur-3xl p-10 rounded-4xl border border-slate-200/60 dark:border-white/5 shadow-2xl relative z-10"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white font-outfit mb-3">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Continue your seamless collaboration</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.name ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1 uppercase tracking-widest ml-1">
                    <IoAlertCircleOutline /> {errors.name}
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium`}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1 uppercase tracking-widest ml-1">
                    <IoAlertCircleOutline /> {errors.email}
                  </p>
                )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:text-cyan-400 transition-colors">Forgot?</Link>
              </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium pr-12`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500 cursor-pointer p-1"
                  >
                    {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1 uppercase tracking-widest ml-1">
                    <IoAlertCircleOutline /> {errors.password}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-5 rounded-3xl shadow-xl shadow-cyan-500/20 transition-all hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-cyan-500 font-bold hover:text-cyan-400 transition-colors">Create one</Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
