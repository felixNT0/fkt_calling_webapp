"use client";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  toggleModal: () => void;
  onDelete: () => void;
}

function DeleteModal({ open, toggleModal, onDelete }: Props) {
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
          <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#111827] w-full max-w-[400px] p-10 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5 pointer-events-auto text-center relative overflow-hidden"
            >
              {/* Subtle Red Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full -mr-16 -mt-16" />

              <button
                onClick={toggleModal}
                className="group absolute right-6 top-6 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
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
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="bg-red-50 dark:bg-red-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-100 dark:border-red-500/20">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 font-outfit">
                Delete Meeting?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed text-sm">
                This action cannot be undone. All meeting data will be
                permanently removed from our servers.
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={onDelete}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-500/20 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
                >
                  Yes, Delete Meeting
                </button>
                <button
                  onClick={toggleModal}
                  className="w-full bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl transition-all hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;
