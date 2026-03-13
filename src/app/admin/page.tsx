"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { getAllMeeting, deleteMeeting } from "@/api";
import { toast } from "react-toastify";
import NavBar from "@/components/NavBar";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, isAdmin, isLoading: authLoading } = useUser();
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery(["Meetings"], getAllMeeting);
  
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast.error("Access Denied: Admin role required.");
      router.push("/");
    }
  }, [authLoading, isAdmin, router]);

  const deleteMutation = useMutation(deleteMeeting, {
    onSuccess: () => {
      toast.success("Meeting deleted by admin");
      refetch();
    }
  });

  if (isLoading || authLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-inter">
      <NavBar />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white font-outfit mb-4">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage all active and scheduled meetings across the platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Meetings", count: data?.length || 0, color: "from-cyan-500 to-blue-600" },
            { label: "Public Calls", count: data?.filter((m: any) => m.accessLevel !== 'authenticated').length || 0, color: "from-emerald-500 to-teal-600" },
            { label: "Auth-Only", count: data?.filter((m: any) => m.accessLevel === 'authenticated').length || 0, color: "from-violet-500 to-purple-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#111827] p-8 rounded-4xl border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${stat.color}`} />
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-slate-900 dark:text-white font-outfit">{stat.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Table/List */}
        <div className="bg-white dark:bg-[#111827] rounded-4xl border border-slate-200 dark:border-white/5 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Meeting</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Schedule</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Privacy</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {data?.map((meeting: any) => (
                  <tr key={meeting.id} className="group hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-white font-black font-outfit text-lg">{meeting.title}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs truncate max-w-[200px]">{meeting.description}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-300 font-bold text-sm tracking-tight">{dayjs(meeting.date).format("MMM D, YYYY")}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs">{dayjs(meeting.date).format("h:mm A")}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        meeting.accessLevel === 'authenticated' 
                          ? 'bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400' 
                          : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {meeting.accessLevel || 'Public'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this meeting?")) {
                            deleteMutation.mutate(meeting.id);
                          }
                        }}
                        className="p-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90 cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
