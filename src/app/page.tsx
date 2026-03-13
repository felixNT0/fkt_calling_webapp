"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import OnboardingModal from "../components/modal/Modal";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

export default function Home() {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      const visited = localStorage.getItem("modal");
      if (visited !== "true") {
        setIsOpen(true);
      }
    }
  }, [user, isLoading]);

  if (isLoading) return <Loader />;

  // Professional Landing Page for All Users
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f1a]">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-cyan-500/20">
              The Future of Collaboration
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white font-outfit mb-8 tracking-tighter leading-[0.9]">
              Connect with <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">Instant Clarity</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience ultra-low latency Video Calls, secure Auth-only rooms, and seamless screen sharing in one premium workspace.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href={user ? "/explore" : "/auth/signup"}
                className="w-full sm:w-auto bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black px-12 py-6 rounded-4xl shadow-2xl shadow-cyan-500/20 transition-all hover:-translate-y-1 active:scale-95 text-lg flex items-center gap-3 cursor-pointer ring-8 ring-cyan-500/5"
              >
                {user ? "Explore Meetings" : "Get Started Free"}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/features"
                className="w-full sm:w-auto bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-black px-12 py-6 rounded-4xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-95 text-lg cursor-pointer"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-24 relative"
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#0b0f1a] via-transparent to-transparent z-10 h-64 bottom-0" />
            <div className="bg-slate-900 rounded-[3rem] p-4 border border-white/10 shadow-3xl overflow-hidden aspect-video max-w-5xl mx-auto ring-1 ring-white/20 relative group">
              <div className="w-full h-full bg-slate-800 rounded-[2.5rem] overflow-hidden relative">
                <iframe 
                  className="w-full h-full border-0 rounded-[2.5rem]"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&loop=1" 
                  title="Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-all pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 dark:border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
                { label: "Active Users", value: "120K+" },
                { label: "Countries", value: "85+" },
                { label: "Meeting Mins", value: "2B+" },
                { label: "Uptime", value: "99.9%" },
            ].map(stat => (
                <div key={stat.label}>
                    <p className="text-4xl font-black text-slate-900 dark:text-white font-outfit mb-2">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white dark:bg-[#0b0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-outfit mb-6 tracking-tight uppercase">Built for <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent italic">Impact</span></h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto">Experience the next generation of video collaboration with industry-leading features.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                    { title: "Crystal Clear Video", desc: "HD resolution with ultra-low latency for natural conversations.", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", color: "cyan" },
                    { title: "Auth-Only Rooms", desc: "Enterprise-grade security with authenticated access controls.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
                    { title: "Screen Sharing", desc: "Instant collaboration with one-click screen sharing technology.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "indigo" },
                    { title: "AI Analytics", desc: "Live summaries and insights powered by advanced AI processing.", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", color: "cyan" },
                ].map((f, i) => (
                    <motion.div 
                        key={f.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-12 bg-slate-50 dark:bg-white/2 border border-slate-200/60 dark:border-white/5 rounded-4xl group hover:border-cyan-500/30 transition-all duration-500"
                    >
                        <div className="w-16 h-16 bg-white dark:bg-white/5 shadow-2xl rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                            <svg className="w-8 h-8 text-cyan-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={f.icon} />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">{f.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-slate-50 dark:bg-white/1 border-y border-slate-200/60 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-outfit mb-6 tracking-tight uppercase">Simple <span className="text-cyan-500 italic">Scale</span></h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto">Choose the plan that fits your collaboration needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {[
                    { name: "Starter", price: "0", desc: "Casual catchups.", feat: ["4 Participants", "Unlimited 1:1", "HD Video", "Native Screen Share"] },
                    { name: "Pro", price: "19", desc: "Scaling teams.", feat: ["50 Participants", "Admin Rec", "Custom Links", "AI Summaries"], popular: true },
                    { name: "Enterprise", price: "49", desc: "Full security.", feat: ["Unlimited Users", "White-label", "24/7 Support", "API Access"] },
                ].map((tier, i) => (
                    <motion.div 
                        key={tier.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`p-12 rounded-[3.5rem] relative overflow-hidden transition-all duration-500 ${tier.popular ? 'bg-slate-900 dark:bg-slate-800 scale-105 shadow-3xl border border-cyan-500 z-10' : 'bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 opacity-90'}`}
                    >
                        {tier.popular && <div className="absolute top-0 right-0 bg-cyan-500 text-white font-black px-6 py-2 rounded-bl-3xl text-[10px] uppercase tracking-widest">Most Popular</div>}
                        <h3 className={`text-2xl font-black mb-2 uppercase tracking-tighter ${tier.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{tier.name}</h3>
                        <p className="text-slate-400 text-sm font-bold mb-10 text-[10px] uppercase tracking-widest">{tier.desc}</p>
                        
                        <div className="flex items-baseline gap-1 mb-10">
                            <span className={`text-6xl font-black font-outfit ${tier.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>${tier.price}</span>
                            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">/mo</span>
                        </div>

                        <div className="space-y-4 mb-12">
                            {tier.feat.map(f => (
                                <div key={f} className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-cyan-500/10 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                                    </div>
                                    <span className={`text-sm font-bold ${tier.popular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>{f}</span>
                                </div>
                            ))}
                        </div>

                        <button className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 cursor-pointer ${tier.popular ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white'}`}>
                            Select {tier.name}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
      <OnboardingModal open={isOpen} toggleModal={() => setIsOpen(!isOpen)} />
    </div>
  );
}
