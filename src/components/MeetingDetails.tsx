"use client";
import dayjs from "dayjs";
import { deleteMeeting, editMeeting, generateAgoraToken } from "../api";
import { useMutation } from "react-query";
import React, { useState } from "react";
import { valueType } from "./NotJoinCall";
import CreateMeetingModal from "./CreateMeetingModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DeleteModal from "./modal/DeleteModal";
import DropdownMenu from "./DropDown";
import { useUser } from "@/context/UserContext";

const MeetingDetailPage = ({
  title,
  description,
  date,
  id,
  refetch,
  user: ownerId, // Rename for clarity
  createAt,
  hideJoinButton = false,
}: any) => {
  const { user: currentUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isOwner = currentUser?.id === ownerId;

  const router = useRouter();

  const toggleModal = () => {
    if (!isOwner) return;
    setIsModalOpen(!isModalOpen);
  };
  const toggleDeleteModal = () => {
    if (!isOwner) return;
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  const { mutate, isLoading, isSuccess } = useMutation(
    (data: any) => editMeeting(id!, data),
    {
      onSuccess: () => {
        toast("Meeting Edited Successfully");
      },
      onError(error, variables, context) {
        toast("An Error Occured");
      },
    }
  );
  const mutation = useMutation(() => deleteMeeting(id), {
    onSuccess: () => {
      toast("Meeting Deleted Successfully");
      router.push("/");
    },
    onError(error, variables, context) {
      toast("An Error Occured");
    },
  });
  const onSubmit = async (val: valueType) => {
    if (!isOwner) return;
    const { title, description, startDate } = val;
    const { token, agoraAppId } = await generateAgoraToken(title, startDate);
    if (token || token === null) {
      mutate({
        title: title,
        description: description,
        date: startDate,
        token: token,
        createAt: createAt,
        updateAt: String(new Date()),
        id: id,
        user: ownerId,
        agoraAppId: agoraAppId,
      });
    }
  };

  const onDelete = () => {
    if (!isOwner) return;
    mutation.mutate();
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      refetch();
    }
  }, [isSuccess]);
  return (
    <>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {!hideJoinButton && (
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 cursor-pointer font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Meetings
            </button>
          )}

            <div className="bg-[#111827]/60 backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-2xl shadow-blue-900/10 p-10 md:p-16 relative overflow-hidden">
              {/* Decorative Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full -mr-48 -mt-48" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pb-16 border-b border-slate-100 dark:border-white/5 relative z-10">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight font-outfit">
                    {title}
                  </h1>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] border border-cyan-200/50 dark:border-cyan-800/50">
                    Meeting Details
                  </span>
                </div>
                
                {isOwner && (
                  <div className="flex gap-4">
                    <button
                      onClick={toggleModal}
                      className="p-5 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 rounded-[1.25rem] hover:bg-cyan-500 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-sm border border-slate-200 dark:border-slate-700/50"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={toggleDeleteModal}
                      className="p-5 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 rounded-[1.25rem] hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-sm border border-slate-200 dark:border-slate-700/50"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                <div className="space-y-10">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 block">
                      Description
                    </label>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {description || "No description provided."}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 block">
                        Date
                      </label>
                      <p className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
                        {dayjs(date).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 block">
                        Time
                      </label>
                      <p className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
                        {dayjs(date).format("h:mm A")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center border border-slate-100 dark:border-white/5">
                  <div className="bg-cyan-500/10 p-4 rounded-2xl mb-6">
                    <svg className="w-10 h-10 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3 font-outfit">Invite Others</h4>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[200px] leading-relaxed text-sm">Share this secure link with your team to start collaborating</p>
                  <div className="w-full flex justify-center scale-110">
                    <DropdownMenu title={title} id={id} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <DeleteModal
        open={isDeleteModalOpen}
        toggleModal={toggleDeleteModal}
        onDelete={onDelete}
      />
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        isLoading={isLoading}
        onSubmit={onSubmit}
        defaultValue={{
          title: title,
          description: description,
          startDate: date,
          accessLevel: "public",
        }}
      />
    </>
  );
};

export default MeetingDetailPage;
