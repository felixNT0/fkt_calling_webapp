"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getMeetingByIdMeeting } from "@/api";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

const AgoraUIVideoPlayer = dynamic(() => import("@/components/Agora/AgoraUIVideoPlayer"), {
  ssr: false,
  loading: () => <Loader callConnection={true} />,
});

import { useSearchParams } from "next/navigation";

export default function RoomPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Guest";
  const initialMic = searchParams.get("mic") !== "false";
  const initialVideo = searchParams.get("video") !== "false";
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(true);

  const { data, isLoading } = useQuery(["Meeting-Id", id], () =>
    getMeetingByIdMeeting(id)
  );

  useEffect(() => {
    // Safety timeout: Ensure loader is hidden even if callbacks fail
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  if (!data) return <div>Meeting not found</div>;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      {loading && <Loader callConnection={true} />}
      <AgoraUIVideoPlayer
        setJoined={setJoined}
        token={data?.token}
        channelName={data?.slug || data?.title}
        agoraAppId={data?.agoraAppId}
        setLoading={setLoading}
        userName={name}
        creatorId={data?.user}
        initialMic={initialMic}
        initialVideo={initialVideo}
      />
      {!joined && (
         <div className="fixed inset-0 bg-[#0B0F1A] flex flex-col items-center justify-center z-50 p-6 text-center">
            <div className="bg-cyan-500/10 p-5 rounded-full mb-8">
              <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-white text-3xl font-black mb-4 font-outfit tracking-tight">Meeting Ended</h2>
            <p className="text-slate-400 mb-10 max-w-xs leading-relaxed">You have successfully left the meeting. Hope you had a great session!</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-cyan-500/20 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Back to Dashboard
            </button>
         </div>
      )}
    </div>
  );
}
