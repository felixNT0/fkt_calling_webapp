"use client";
import React from "react";
import { motion } from "framer-motion";

function Loader({ callConnection }: { callConnection?: boolean }) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background with Gradient Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
      />
      
      {/* Animated Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Main Spinner Container */}
        <div className="relative w-32 h-32">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          />
          
          {/* Inner Pulsing Core */}
          <motion.div
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <h2 className="text-xl font-black text-white tracking-widest uppercase font-outfit mb-2">
            {callConnection ? "Initializing Call" : "Loading Workspace"}
          </h2>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Loader;
