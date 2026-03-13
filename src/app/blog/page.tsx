"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function BlogPage() {
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
            Insights & Updates
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-outfit mb-8 tracking-tighter uppercase">
            The <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent italic">Knowledge Base</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { date: "March 12, 2026", title: "Scaling Video Infrastructure to 1M Users", excerpt: "How we optimized our global RTC nodes to handle peak traffic without latency spikes." },
            { date: "March 05, 2026", title: "Announcing AI-Powered Live Summaries", excerpt: "Introducing our new collaboration tool that writes meeting notes so you don't have to." },
            { date: "February 28, 2026", title: "The Future of Remote Collaboration", excerpt: "Why the next decade of work will be defined by browser-based professional tools." },
            { date: "February 20, 2026", title: "Security First: Our Approach to Encryption", excerpt: "A deep dive into how we secure your data from end-to-end using modern protocols." }
          ].map((post) => (
            <motion.div 
              key={post.title}
              whileHover={{ y: -5 }}
              className="group p-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] cursor-pointer hover:border-cyan-500/30 transition-all"
            >
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4 block">{post.date}</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter group-hover:text-cyan-500 transition-colors">{post.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">{post.excerpt}</p>
              <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                Read More 
                <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </span>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
