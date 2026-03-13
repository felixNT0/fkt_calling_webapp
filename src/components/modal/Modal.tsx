"use client";
// src/components/EcommerceOnboardingModal.tsx
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import image from "../../get-started.svg";

interface Props {
  open: boolean;
  toggleModal: () => void;
}

const OnboardingModal: React.FC<Props> = ({ open, toggleModal }) => {
  React.useEffect(() => {
    if (!open) {
      localStorage.setItem("modal", true.toString());
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 min-w-full min-h-full bg-slate-950/40 backdrop-blur-md transition-all z-90"
            onClick={toggleModal}
          />
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-slate-900 w-[95%] sm:w-[500px] p-8 rounded-4xl shadow-2xl border border-slate-200 dark:border-slate-800 pointer-events-auto"
            >
              <button
                onClick={toggleModal}
                className="group absolute right-6 top-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3 className="mb-4 text-2xl font-black tracking-tight text-slate-900 dark:text-white text-center">
                Welcome to VideoCall
              </h3>
              <div className="flex justify-center items-center py-6">
                <Image
                  className="max-w-full h-auto"
                  src={image}
                  alt="Getting Started"
                  width={220}
                  height={220}
                  priority
                />
              </div>
              <p className="mb-8 text-lg text-center text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect with anyone, anywhere. Clear video, crisp audio, and
                seamless interactions.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={toggleModal}
                  className="inline-flex cursor-pointer justify-center items-center py-4 px-10 text-lg font-bold text-center text-white rounded-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Get started
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
