"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f1a] flex flex-col">
      <NavBar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-cyan-500/20">
            Join the Revolution
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-outfit mb-8 tracking-tighter uppercase">
            Build the <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent italic">Next Decade</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            We're a distributed team of engineers, designers, and thinkers obsessed with communication.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {[
            { role: "Senior RTC Engineer", location: "Remote / US", type: "Full-Time" },
            { role: "Product Designer (UI/UX)", location: "Remote / EU", type: "Full-Time" },
            { role: "Fullstack Developer (Next.js)", location: "Remote / Global", type: "Contract" },
            { role: "Security Architect", location: "Remote / US", type: "Full-Time" }
          ].map((job) => (
            <motion.div 
              key={job.role}
              whileHover={{ x: 10 }}
              className="p-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center group cursor-pointer hover:border-cyan-500/30 transition-all"
            >
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter group-hover:text-cyan-500 transition-colors">{job.role}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{job.location}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">•</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{job.type}</span>
                </div>
              </div>
              <button className="mt-6 md:mt-0 px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
