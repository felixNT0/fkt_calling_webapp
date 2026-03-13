"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { useQuery } from "react-query";
import { getAllMeeting } from "@/api";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import MeetingCard from "@/components/MeetingCard";
import { IoCalendarOutline, IoTimeOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { useMeeting } from "@/context/MeetingContext";

export default function ProfilePage() {
  const { user, isLoading: userLoading } = useUser();
  const { openCreateModal } = useMeeting();
  const { data: meetings, isLoading: meetingsLoading, isError } = useQuery(
    "meetings",
    getAllMeeting,
    { enabled: !!user }
  );

  if (userLoading || meetingsLoading) return <Loader />;
  if (!user) return null;

  const userMeetings = meetings?.filter((m: any) => m.creatorId === user.id) || [];
  
  const stats = [
    { label: "Total Meetings", value: userMeetings.length, icon: <IoCalendarOutline /> },
    { label: "Hours Hosted", value: (userMeetings.length * 1.5).toFixed(1), icon: <IoTimeOutline /> }, // Mock calculation
    { label: "Account Status", value: user.subscription.toUpperCase(), icon: <IoCheckmarkCircleOutline /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f1a] flex flex-col">
      <NavBar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-32 h-32 bg-linear-to-br from-cyan-500 to-blue-600 rounded-4xl flex items-center justify-center text-4xl font-black text-white shadow-2xl">
              {user.name.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
                {user.name}
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {stats.map((stat) => (
              <div key={stat.label} className="p-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-4xl flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{stat.value}</p>
                </div>
                <div className="text-2xl text-cyan-500 opacity-20 group-hover:opacity-100 transition-opacity">
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Your Meetings</h2>
              <span className="px-4 py-1.5 bg-cyan-500/10 text-cyan-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-cyan-500/20">
                History
              </span>
            </div>

            {isError ? (
              <div className="p-20 text-center bg-red-500/5 border border-red-500/20 rounded-3xl">
                <p className="text-red-500 font-black uppercase tracking-widest text-xs">Failed to load meeting history</p>
              </div>
            ) : userMeetings.length === 0 ? (
              <div className="p-32 text-center bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-4xl">
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4">No meetings found</p>
                <button 
                  onClick={openCreateModal}
                  className="bg-cyan-500 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:translate-y-[-2px] transition-all cursor-pointer"
                >
                  Create Your First Meeting
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userMeetings.map((meeting: any) => (
                  <MeetingCard key={meeting.id} {...meeting} />
                ))}
              </div>
            )}
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
