"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import DropdownMenu from "./DropDown";
import { motion } from "framer-motion";

dayjs.extend(relativeTime);

interface MeetingCardProps {
  title: string;
  description: string;
  date: string;
  id: string;
  slug?: string;
  isActive?: boolean;
  accessLevel?: "authenticated" | "public";
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const MeetingCard = ({ title, description, date, id, slug, isActive, accessLevel }: MeetingCardProps) => {
  const router = useRouter();
  const currentTime = dayjs();
  const formattedEventTime = dayjs(date);

  dayjs.locale("en");

  const isEventPassed = formattedEventTime < currentTime;
  const isLive = isActive;

  const handleNavigate = () => {
    router.push(`/${slug || id}/join`);
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onClick={handleNavigate}
      className="group relative h-full flex flex-col bg-white dark:bg-[#111827]/80 backdrop-blur-2xl rounded-4xl overflow-hidden border border-slate-200/60 dark:border-white/5 shadow-2xl shadow-blue-900/5 dark:shadow-none cursor-pointer transition-all duration-300"
    >
      {/* Card Header Decoration */}
      <div className={`h-2.5 w-full ${isLive ? 'bg-cyan-500 animate-pulse' : isEventPassed ? 'bg-slate-300 dark:bg-slate-700' : 'bg-linear-to-r from-blue-500 to-indigo-600'}`} />
      
      <div className="p-8 grow relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-cyan-500/10 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-125 duration-500" />
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex gap-2">
            {isLive && (
              <span className="bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-widest shadow-lg shadow-red-500/20">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                Live
              </span>
            )}
            {accessLevel === "authenticated" && (
              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-widest border border-white/10 shadow-lg">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Private
              </span>
            )}
          </div>
          <div onClick={(e) => e.stopPropagation()} className="cursor-pointer">
            <DropdownMenu title={title} id={slug || id} />
          </div>
        </div>

        <h2 className="text-xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-1 font-outfit">
          {title || "Team Meeting"}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 line-clamp-2 text-sm leading-relaxed font-medium">
          {description || "Join our collaborative session."}
        </p>
        
        <div className="space-y-3 mt-auto relative z-10">
          <div className="flex items-center gap-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <svg className="w-4 h-4 text-cyan-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedEventTime.format("MMM D, YYYY")}
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Time</span>
          <span className="text-lg font-black text-slate-900 dark:text-white font-outfit">
            {formattedEventTime.format("h:mm A")}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
          className={`group flex items-center justify-center gap-3 h-14 px-6 rounded-2xl transition-all duration-300 active:scale-95 text-xs font-black uppercase tracking-widest cursor-pointer ${
            isEventPassed && !isLive
              ? "bg-slate-100 text-slate-400 dark:bg-slate-800"
              : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white shadow-xl"
          }`}
          disabled={isEventPassed && !isLive}
        >
          {isLive ? "Join Now" : "Details"}
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default MeetingCard;
