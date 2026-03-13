import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { MdCall } from "react-icons/md";
import { getAllMeeting } from "../api";
import { useUser } from "../context/UserContext";
import Loader from "./Loader";
import MeetingCard from "./MeetingCard";

export type valueType = {
  title: string;
  description: string;
  startDate: string | Date;
  accessLevel: "authenticated" | "public";
};

function NotJoinCall({
  hideHero = false,
  publicOnly = false,
}: {
  hideHero?: boolean;
  publicOnly?: boolean;
}) {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "live" | "my" | "upcoming" | "explore"
  >("explore");
  const {
    data,
    isLoading: dataIsLoading,
  } = useQuery(["Meetings"], getAllMeeting);

  const categorizedMeetings = React.useMemo(() => {
    if (!Array.isArray(data))
      return { live: [], upcoming: [], mine: [], explore: [] };

    const now = dayjs();
    let baseData = [...data];
    if (publicOnly) {
      baseData = baseData.filter((m) => m.accessLevel === "public");
    }

    const live = baseData.filter((m) => m.isActive);
    const upcoming = baseData.filter((m) => {
      const start = dayjs(m.date);
      return !m.isActive && start.isAfter(now) && start.diff(now, "hours") < 6;
    });
    const mine = publicOnly ? [] : data.filter((m) => m.user === user?.id);
    const explore = [...baseData].sort(() => Math.random() - 0.5).slice(0, 6);

    return { live, upcoming, mine, explore };
  }, [data, user, publicOnly]);

  if (dataIsLoading) return <Loader />;

  const Section = ({ title, meetings }: { title: string; meetings: any[] }) => (
    <div className="mb-16 last:mb-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tight flex items-center gap-3">
          {title}
          <span className="px-3 py-1 rounded-full text-[10px] font-black bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
            {meetings.length}
          </span>
        </h2>
      </div>

      {meetings.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {meetings.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <MeetingCard {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-12 bg-slate-50/50 dark:bg-white/5 rounded-4xl border-2 border-dashed border-slate-200 dark:border-white/5 text-center px-6">
          <p className="text-slate-400 font-medium text-sm">
            No meetings found in this category.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      {!hideHero && (
        <div className="text-center mb-20 relative overflow-hidden rounded-[3rem] bg-linear-to-br from-slate-900 via-blue-950 to-[#0B0F1A] p-16 shadow-3xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-none">
                Start a <span className="text-cyan-400">Collaboration</span>{" "}
                <br /> In Seconds
              </h1>
              <p className="text-lg text-slate-300/80 mb-10 leading-relaxed font-outfit max-w-lg mx-auto">
                Secure, fast, and feature-rich video calling for teams who value
                privacy and performance.
              </p>
              <Link
                href="/explore"
                className="group relative inline-flex items-center justify-center bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-6 px-12 rounded-4xl shadow-2xl shadow-cyan-500/30 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer overflow-hidden ring-4 ring-cyan-500/10"
              >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                   <MdCall size={24} />
                   Start Exploring
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </motion.div>
          </div>

          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      )}

      {/* Tab Navigation & Action */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex items-center bg-slate-50 dark:bg-white/2 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-inner overflow-x-auto max-w-full">
          {[
            { id: "explore", label: "Global" },
            { id: "live", label: "Live Now" },
            { id: "upcoming", label: "Upcoming" },
            { id: "my", label: "My Meetings", restricted: publicOnly },
          ]
            .filter((t) => !t.restricted)
            .map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === tab.id ? "bg-white dark:bg-slate-900 text-cyan-500 shadow-md border border-slate-200 dark:border-white/10" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"}`}
              >
                {tab.label}
              </button>
            ))}
        </div>
      </div>
 
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "explore" && (
            <Section
              title="Explore Global Meetings"
              meetings={categorizedMeetings.explore}
            />
          )}
          {activeTab === "live" && (
            <Section title="Live Now" meetings={categorizedMeetings.live} />
          )}
          {activeTab === "my" && !publicOnly && (
            <Section title="My Meetings" meetings={categorizedMeetings.mine} />
          )}
          {activeTab === "upcoming" && (
            <Section title="Upcoming" meetings={categorizedMeetings.upcoming} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default NotJoinCall;
