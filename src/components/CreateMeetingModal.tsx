"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingCircle from "./LoadingCircle";
import { valueType } from "./NotJoinCall";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { IoTimeOutline, IoCalendarOutline, IoLinkOutline, IoShieldCheckmarkOutline, IoFlashOutline, IoAlertCircleOutline } from "react-icons/io5";
import { useUser } from "@/context/UserContext";

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (val: valueType) => void;
  isLoading: boolean;
  defaultValue?: valueType;
  createdData?: any;
}

const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  defaultValue,
  createdData,
}) => {
  const { user } = useUser();
  const [title, setTitle] = useState(defaultValue?.title || "");
  const [description, setDescription] = useState(
    defaultValue?.description || ""
  );
  const [startDate, setStartDate] = useState(
    defaultValue?.startDate || String(new Date())
  );

  const [accessLevel, setAccessLevel] = useState<"authenticated" | "public">(
    (defaultValue as any)?.accessLevel || "public"
  );

  const value = dayjs(defaultValue?.startDate).format("MMMM D, YYYY:h:mm A");

  const [isInstant, setIsInstant] = useState(true);

  const [dateValue, setDateValue] = useState(value || dayjs().format("YYYY-MM-DDTHH:mm"));
  const [errors, setErrors] = useState<{ title?: string; startDate?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Meeting title is required";
    if (!isInstant && !startDate) newErrors.startDate = "Start date is required";
    if (!isInstant && dayjs(startDate).isBefore(dayjs())) {
      newErrors.startDate = "Start date cannot be in the past";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyInput = () => {
    if (title.trim() === "") return false;
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    const finalStartDate = isInstant ? new Date().toISOString() : startDate;
    onSubmit({ title, description, startDate: finalStartDate, accessLevel } as any);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStartDateChange = (e: any) => {
    setDateValue(e.target.value);
    const newStartDate = new Date(e.target.value);
    setStartDate(newStartDate.toISOString());
  };

  const inviteLink = `${typeof window !== "undefined" ? window.location.origin : ""}/${createdData?.slug || createdData?.id}/join`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    import("react-toastify").then(({ toast }) => {
      toast.info("Invite link copied!");
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 min-w-full min-h-full bg-slate-950/40 backdrop-blur-md transition-all z-50"
            onClick={onClose}
          />
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#111827] w-[95%] sm:w-[500px] p-8 rounded-4xl shadow-2xl border border-slate-200 dark:border-white/5 pointer-events-auto overflow-hidden relative"
            >
              {createdData ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                    <IoShieldCheckmarkOutline className="text-emerald-500 text-4xl" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 font-outfit uppercase tracking-tighter">Ready to Go!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Your meeting has been secured and is live.</p>
                  
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 border border-slate-200 dark:border-white/5 mb-8 text-left">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">Invite Link</label>
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate flex-1">{inviteLink}</span>
                      <button 
                        onClick={copyToClipboard}
                        className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg hover:bg-cyan-500 hover:text-white transition-all cursor-pointer"
                      >
                        <IoLinkOutline size={18} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                       <span className="text-[10px] font-black text-slate-400">Slug:</span>
                       <span className="px-2 py-0.5 bg-slate-200 dark:bg-white/5 rounded text-[10px] font-mono text-cyan-500 font-bold">{createdData.slug}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => window.location.href = `/${createdData.slug || createdData.id}/room`}
                      className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-cyan-500/20 transition-all hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest cursor-pointer"
                    >
                      Jump to Room
                    </button>
                    <button 
                      onClick={onClose}
                      className="w-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white font-bold py-5 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-95 text-xs uppercase tracking-widest cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white font-outfit">
                    {defaultValue?.title ? "Edit Meeting" : "Create Meeting"}
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Instant Meeting Toggle */}
                    <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5">
                        <button
                            onClick={() => setIsInstant(true)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${isInstant ? 'bg-white dark:bg-slate-800 text-cyan-500 shadow-md border border-slate-200 dark:border-white/10' : 'text-slate-400'}`}
                        >
                            <IoFlashOutline size={16} />
                            Instant
                        </button>
                        <button
                            onClick={() => setIsInstant(false)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${!isInstant ? 'bg-white dark:bg-slate-800 text-cyan-500 shadow-md border border-slate-200 dark:border-white/10' : 'text-slate-400'}`}
                        >
                            <IoCalendarOutline size={16} />
                            Scheduled
                        </button>
                    </div>

                    <div className="relative">
                        <input
                        type="text"
                        className={`w-full border ${errors.title ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-2xl px-5 py-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 font-bold placeholder:text-slate-400 outline-none`}
                        placeholder="Meeting Title"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          if (errors.title) setErrors({ ...errors, title: undefined });
                        }}
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                            <IoLinkOutline size={20} />
                        </div>
                        {errors.title && (
                          <p className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-2 uppercase tracking-widest ml-1">
                            <IoAlertCircleOutline /> {errors.title}
                          </p>
                        )}
                    </div>
                    
                    <div className="relative">
                        <textarea
                        className="w-full border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 resize-none font-medium placeholder:text-slate-400 outline-none"
                        placeholder="Brief Description (Optional)"
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={3}
                        />
                    </div>
                    
                    <AnimatePresence>
                        {!isInstant && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="flex flex-col gap-2 overflow-hidden"
                            >
                                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                     <IoTimeOutline size={14} />
                                     Start Time
                                 </label>
                                 <div className="relative group">
                                     <DatePicker
                                         selected={startDate ? new Date(startDate) : new Date()}
                                         onChange={(date: Date | null) => {
                                             if (date) {
                                                setStartDate(date.toISOString());
                                                if (errors.startDate) setErrors({ ...errors, startDate: undefined });
                                             }
                                         }}
                                         showTimeSelect
                                         dateFormat="MMMM d, yyyy h:mm aa"
                                         className={`w-full border ${errors.startDate ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-2xl px-5 py-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 outline-none font-bold cursor-pointer`}
                                         calendarClassName="!bg-white dark:!bg-slate-900 !border-slate-200 dark:!border-white/10 !rounded-3xl !shadow-2xl !p-4 !font-outfit"
                                         popperPlacement="bottom-end"
                                     />
                                     <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-cyan-500 transition-colors">
                                         <IoCalendarOutline size={20} />
                                     </div>
                                 </div>
                                 {errors.startDate && (
                                   <p className="flex items-center gap-1 text-[10px] text-red-500 font-bold mt-1 uppercase tracking-widest ml-1">
                                     <IoAlertCircleOutline /> {errors.startDate}
                                   </p>
                                 )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {user && (
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <IoShieldCheckmarkOutline size={14} />
                                Security
                            </label>
                            <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5">
                                <button
                                    onClick={() => setAccessLevel("public")}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all cursor-pointer ${
                                    accessLevel === "public" 
                                        ? "bg-white dark:bg-slate-800 text-cyan-500 shadow-md border border-slate-200 dark:border-white/10" 
                                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    }`}
                                >
                                    Public
                                </button>
                                <button
                                    onClick={() => setAccessLevel("authenticated")}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all cursor-pointer ${
                                    accessLevel === "authenticated" 
                                        ? "bg-white dark:bg-slate-800 text-cyan-500 shadow-md border border-slate-200 dark:border-white/10" 
                                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    }`}
                                >
                                    Private
                                </button>
                            </div>
                        </div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      className={`flex-1 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl font-black py-4 transition-all duration-300 active:scale-95 shadow-xl shadow-cyan-500/20 ${
                        isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                      }`}
                      onClick={handleSave}
                      disabled={isLoading || !verifyInput()}
                    >
                      {defaultValue?.title ? "Update Meeting" : "Create Meeting"}
                    </button>
                    <button
                      className={`flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold py-4 transition-all duration-200 active:scale-95 ${
                        isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                      }`}
                      onClick={onClose}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateMeetingModal;
