"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getMeetingByIdMeeting } from "@/api";
import Loader from "@/components/Loader";
import MeetingDetailPage from "@/components/MeetingDetails";
import NavBar from "@/components/NavBar";
import { useUser } from "@/context/UserContext";
import { IoMicOutline, IoMicOffOutline, IoVideocamOutline, IoVideocamOffOutline, IoArrowForwardOutline } from "react-icons/io5";

export default function JoinPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useUser();
  const [meeting, setMeeting] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [displayName, setDisplayName] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setDisplayName(user.name);
    }
  }, [user]);

  useEffect(() => {
    async function fetchMeeting() {
      try {
        const data = await getMeetingByIdMeeting(id);
        setMeeting(data);
        
        // Access Level Check
        if (typeof window !== "undefined") {
          const userId = localStorage.getItem("currentActiveUserId");
          if (data?.accessLevel === "authenticated" && !userId) {
            import("react-toastify").then(({ toast }) => {
              toast.error("Restricted Meeting: Please sign in (Get Started) to join.");
            });
            router.push("/");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMeeting();
  }, [id, router]);

  const setupCamera = async (v: boolean, a: boolean) => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      const constraints = {
        video: v,
        audio: a
      };
      
      if (!v && !a) {
        setStream(null);
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Media error:", err);
    }
  };

  useEffect(() => {
    setupCamera(isVideoOn, isMicOn);
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleVideo = () => {
    const nextValue = !isVideoOn;
    setIsVideoOn(nextValue);
    setupCamera(nextValue, isMicOn);
  };

  const toggleMic = () => {
    const nextValue = !isMicOn;
    setIsMicOn(nextValue);
    setupCamera(isVideoOn, nextValue);
  };

  const handleJoin = () => {
    if (!displayName.trim()) {
      import("react-toastify").then(({ toast }) => {
        toast.error("Please enter your name to join.");
      });
      return;
    }
    
    // Explicitly cleanup stream before navigating
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log(`Stopped track: ${track.kind}`);
      });
    }
    
    router.push(`/${id}/room?name=${encodeURIComponent(displayName)}&mic=${isMicOn}&video=${isVideoOn}`);
  };

  if (isLoading) return <Loader />;

  if (!meeting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Meeting not found</h1>
        <button 
          onClick={() => router.push('/')}
          className="bg-primary text-white px-6 py-2 rounded-xl"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <NavBar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <MeetingDetailPage
          title={meeting.title}
          description={meeting.description}
          date={meeting.date}
          id={id}
          refetch={() => {}}
          user={meeting.user}
          createAt={meeting.createAt}
          hideJoinButton={true}
        />

        <div className="mt-16 flex flex-col items-center justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-white/70 dark:bg-[#111827]/80 backdrop-blur-3xl rounded-4xl p-10 border border-slate-200/60 dark:border-white/5 shadow-2xl shadow-blue-900/10"
          >
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center font-outfit">
              Identity Verification
            </h2>

            <div className="mb-10">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">
                Display Name (Visible to others)
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-hidden"
              />
            </div>
            
            <div className="aspect-video bg-slate-900 rounded-4xl overflow-hidden relative mb-10 group shadow-2xl ring-1 ring-white/10">
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline 
                className="w-full h-full object-cover mirror"
              />
              {!stream && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
                  <div className="text-center p-8">
                    <div className="bg-slate-800/80 p-5 rounded-full inline-block mb-4 border border-white/5">
                      <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Camera is initializing...</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-5">
                <button 
                  onClick={toggleMic}
                  className={`p-4 backdrop-blur-xl rounded-2xl transition-all border cursor-pointer ${isMicOn ? 'bg-white/10 text-cyan-400 border-white/10' : 'bg-red-500/20 text-red-500 border-red-500/50'}`}
                  title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                >
                  {isMicOn ? <IoMicOutline size={22} /> : <IoMicOffOutline size={22} />}
                </button>
                <button 
                  onClick={toggleVideo}
                  className={`p-4 backdrop-blur-xl rounded-2xl transition-all border cursor-pointer ${isVideoOn ? 'bg-white/10 text-cyan-400 border-white/10' : 'bg-red-500/20 text-red-500 border-red-500/50'}`}
                  title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
                >
                  {isVideoOn ? <IoVideocamOutline size={22} /> : <IoVideocamOffOutline size={22} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleJoin}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-6 rounded-3xl shadow-2xl shadow-cyan-500/20 transition-all hover:-translate-y-1 active:scale-95 text-xl flex items-center justify-center gap-4 group cursor-pointer"
            >
              <span>Join Room</span>
              <IoArrowForwardOutline className="text-2xl transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
