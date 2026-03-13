"use client";
import Link from "next/link";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { MdCall } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-white/5 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-8 group cursor-pointer"
            >
              <div className="bg-linear-to-br from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg">
                <MdCall className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent uppercase tracking-tight font-outfit">
                FKT Calls
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              The next generation of high-fidelity video collaboration for
              professional teams. Low latency, high impact.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 bg-white dark:bg-white/5 rounded-xl text-slate-400 hover:text-cyan-500 transition-all border border-slate-200 dark:border-white/5 cursor-pointer"
              >
                <IoLogoTwitter size={18} />
              </a>
              <a
                href="#"
                className="p-3 bg-white dark:bg-white/5 rounded-xl text-slate-400 hover:text-cyan-500 transition-all border border-slate-200 dark:border-white/5 cursor-pointer"
              >
                <IoLogoGithub size={18} />
              </a>
              <a
                href="#"
                className="p-3 bg-white dark:bg-white/5 rounded-xl text-slate-400 hover:text-cyan-500 transition-all border border-slate-200 dark:border-white/5 cursor-pointer"
              >
                <IoLogoLinkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8 select-none">
              Product
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Explore", href: "/explore" },
                { name: "Features", href: "/#features" },
                { name: "Pricing", href: "/#pricing" },
                // { name: "API Docs", href: "/api-docs" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8 select-none">
              Company
            </h4>
            <ul className="space-y-4">
              {["About", "Blog", "Security"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8 select-none">
              Updates
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
              Get the latest feature drops directly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="name@email.com"
                className="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-500"
              />
              <button className="bg-linear-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200/60 dark:border-white/5 flex flex-col md:flex-row justify-between gap-8 items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>© 2026 FKT Calls Inc. All rights reserved.</p>
          <div className="flex gap-12">
            <Link
              href="/privacy"
              className="hover:text-cyan-500 transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-cyan-500 transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
