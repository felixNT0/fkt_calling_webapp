"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f1a] flex flex-col">
      <NavBar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-cyan-500/20">
            <svg className="w-10 h-10 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-cyan-500/20">
            FortKnox Security
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-outfit mb-8 tracking-tighter uppercase">
            Built to be <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent italic">Unbreakable</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {[
            { title: "End-to-End Encryption", desc: "Your data is encrypted from the moment it leaves your device until it reaches the recipient. Even we can't see it." },
            { title: "SOC2 Type II Compliant", desc: "We adhere to the highest industry standards for security, availability, and processing integrity." },
            { title: "Distributed Network", desc: "Our global infrastructure is designed to resist DDoS attacks and ensure 99.99% uptime." },
            { title: "Auth-Only Rooms", desc: "Strict identity verification ensures that only invited and authorized users can join your sessions." }
          ].map((item) => (
            <div key={item.title} className="p-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem]">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
