"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f1a] flex flex-col">
      <NavBar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-cyan-500/20">
            Our Mission
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-outfit mb-8 tracking-tighter uppercase">
            Redefining <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent italic">Human Connection</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed mb-16">
            VideoCall was founded with a single goal: to make professional collaboration as seamless as being in the same room. We combine cutting-edge technology with intuitive design to empower teams worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { title: "Innovation", desc: "Always pushing the boundaries of what's possible in video communication." },
              { title: "Privacy", desc: "Enterprise-grade security is baked into every line of code we write." },
              { title: "Excellence", desc: "Dedicated to providing the highest fidelity experience for every user." }
            ].map((value) => (
              <div key={value.title} className="p-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter text-cyan-500">{value.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
