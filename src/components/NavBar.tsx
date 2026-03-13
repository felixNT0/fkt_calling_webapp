"use client";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdCall, MdAdd } from "react-icons/md";
import { useMeeting } from "@/context/MeetingContext";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAdmin } = useUser();
  const { openCreateModal } = useMeeting();

  const isAuthPage = pathname?.startsWith("/auth");
  if (isAuthPage) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-800/50 rounded-3xl px-6 py-4 flex items-center justify-between shadow-2xl shadow-indigo-500/10">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
            >
              <div className="bg-linear-to-br from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
                <MdCall className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent uppercase tracking-tight font-outfit">
                FKT Calls
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/explore"
                className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${pathname === '/explore' ? 'text-cyan-500' : 'text-slate-400 hover:text-cyan-500'}`}
              >
                Explore
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${pathname === '/admin' ? 'text-cyan-500' : 'text-slate-400 hover:text-cyan-500'}`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={openCreateModal}
              className="hidden lg:flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <MdAdd size={16} />
              Create Meeting
            </button>

            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-1.5 pr-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-cyan-500/20">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col items-start leading-none">
                    <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-1">
                      {user.name}
                    </span>
                    <span className="text-[8px] font-black text-cyan-500 uppercase tracking-widest">
                      {user.subscription}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-100">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-4xl shadow-2xl p-3 backdrop-blur-3xl">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Settings
                    </Link>
                    <div className="h-px bg-slate-200 dark:bg-white/5 my-2 mx-2" />
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-[10px] font-black uppercase tracking-widest text-red-500 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden sm:block text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:translate-y-[-2px] active:scale-95 transition-all shadow-xl shadow-slate-900/10 cursor-pointer"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
