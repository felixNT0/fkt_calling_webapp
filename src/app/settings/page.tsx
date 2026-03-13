"use client";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import { IoPersonOutline, IoLockClosedOutline, IoShieldCheckmarkOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function SettingsPage() {
  const { user, login } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      login({ ...user, name, email });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f1a] flex flex-col">
      <NavBar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center md:text-left mb-16">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Account Settings</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Manage your profile and platform preferences</p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Profile Section */}
            <section className="p-10 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem]">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-2xl border border-cyan-500/20">
                  <IoPersonOutline size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Public Profile</h2>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white outline-none focus:border-cyan-500 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white outline-none focus:border-cyan-500 transition-all font-bold"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="bg-linear-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:-translate-y-1 transition-all cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            </section>

            {/* Quick Actions */}
            <section className="space-y-4">
               {[
                 { label: "Change Password", icon: <IoLockClosedOutline />, desc: "Update your security credentials" },
                 { label: "Security & Privacy", icon: <IoShieldCheckmarkOutline />, desc: "Adjust your data and visibility settings" },
                 { label: "Manage Subscriptions", icon: <IoChevronForwardOutline />, desc: "View plan details and invoices" },
               ].map((action) => (
                 <div key={action.label} className="p-6 bg-white dark:bg-white/2 border border-slate-200/60 dark:border-white/5 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-slate-50 dark:bg-white/5 text-slate-400 group-hover:text-cyan-500 group-hover:bg-cyan-500/10 rounded-2xl transition-all">
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">{action.label}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{action.desc}</p>
                      </div>
                    </div>
                    <IoChevronForwardOutline className="text-slate-300 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                 </div>
               ))}
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
