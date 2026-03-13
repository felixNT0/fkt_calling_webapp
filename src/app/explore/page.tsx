"use client";

import React from "react";
import NavBar from "@/components/NavBar";
import NotJoinCall from "@/components/NotJoinCall";
import { useUser } from "@/context/UserContext";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";

export default function MeetingsPage() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f1a]">
      <NavBar />
      
      <main className="max-w-7xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tighter">
                Explore <span className="text-cyan-500">Meetings</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Discover ongoing and upcoming public calls from around the world.
            </p>
        </motion.div>

        <NotJoinCall hideHero={true} publicOnly={true} />
      </main>
    </div>
  );
}
