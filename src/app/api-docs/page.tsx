"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function APIDocsPage() {
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
            Developer Hub
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-outfit mb-8 tracking-tighter uppercase">
            Build with <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent italic">Confidence</span>
          </h1>
        </motion.div>

        <div className="bg-slate-900 rounded-[3rem] border border-white/10 p-12 overflow-hidden shadow-3xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Quick Integration Guide</span>
          </div>

          <pre className="text-sm font-bold text-cyan-500 font-mono leading-relaxed overflow-x-auto">
{`const client = new VideoCallClient({
  apiKey: "YOUR_API_KEY",
  region: "us-east-1"
});

// Initialize a new high-fidelity room
const room = await client.createRoom({
  title: "Dev Sync",
  privacy: "private"
});

console.log(\`Room created: \${room.url}\`);`}
          </pre>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Web Hooks', 'React SDK', 'Mobile SDK'].map(feature => (
            <div key={feature} className="p-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">{feature}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Coming Q3 2026</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
