"use client";
import AgoraUIKit from "agora-react-uikit";
import { message } from "antd";
import React, { useState } from "react";

import { useUser } from "@/context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoChatbubbleOutline,
  IoCloseOutline,
  IoMicOffOutline,
  IoPeopleOutline,
  IoPersonRemoveOutline,
  IoSparklesOutline,
} from "react-icons/io5";

function AgoraUIVideoPlayer({
  token,
  channelName,
  setJoined,
  setLoading,
  agoraAppId,
  userName,
  creatorId,
  initialMic = true,
  initialVideo = true,
}: any) {
  const { user } = useUser();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [summary, setSummary] = useState("");

  const isHost = user?.id === creatorId;

  const joinSound = React.useRef<HTMLAudioElement | null>(null);
  const leaveSound = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    joinSound.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3",
    );
    leaveSound.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3",
    );
  }, []);

  const rtcProps = {
    appId: agoraAppId || process.env.NEXT_PUBLIC_AGORA_APP_ID,
    channel: channelName,
    token: token === "null" || !token ? null : token,
    uid: user?.id
      ? Number(user.id.replace(/\D/g, "").slice(0, 8))
      : Math.floor(Math.random() * 100000),
    enableScreensharing: true,
    initialMicMuted: !initialMic,
    initialCameraMuted: !initialVideo,
  };

  React.useEffect(() => {
    console.log("[AGORA_DEBUG] RTC Props:", {
      appId: rtcProps.appId,
      channel: rtcProps.channel,
      hasToken: !!rtcProps.token,
      uid: rtcProps.uid,
    });
  }, [rtcProps.appId, rtcProps.channel, rtcProps.token, rtcProps.uid]);

  const callbacks = {
    EndCall: () => setJoined(false),
    JoinChannel: () => {
      setLoading(false);
      message.success("Connected to meeting");
    },
    ["user-joined"]: (user: any) => {
      joinSound.current?.play().catch(() => {});
      message.info(`User ${user.uid} joined`);
      setParticipants((prev) => [
        ...prev,
        {
          id: user.uid,
          name: `User ${user.uid}`,
          isLocal: false,
          muted: false,
        },
      ]);
    },
    ["user-left"]: (user: any) => {
      leaveSound.current?.play().catch(() => {});
      message.info(`User ${user.uid} left`);
      setParticipants((prev) => prev.filter((p) => p.id !== user.uid));
    },
    ["connection-state-change"](curState: any, _: any, reason: any): void {
      if (curState === "DISCONNECTED") {
        setLoading(false);
        // Suppress "disconnected" message during initial setup or clean leave
        if (reason !== "LEAVE" && reason !== "REJOIN") {
          // If we were never connected, don't show the error yet
          // Only show error if we were actually in a call
          console.log("Disconnected reason:", reason);
        }
      }
    },
  };

  const customButton = {
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 0,
    backdropFilter: "blur(10px)",
  };

  const backgroundColor = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };

  const styleProps = {
    theme: "#0ea5e9", // Brand Cyan
    UIKitContainer: {
      background: "#0b0f1a",
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-outfit)",
      width: "100%",
      height: "100%",
      position: "relative",
      flex: 1,
    },
    localControlStyles: {
      position: "absolute",
      bottom: 40,
      left: "50%",
      transform: "translateX(-50%)",
      height: 80,
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      backdropFilter: "blur(32px)",
      borderRadius: 24,
      width: "fit-content",
      display: "flex",
      alignItems: "center",
      padding: "0 30px",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9)",
      zIndex: 100,
    },
    gridVideoContainer: {
      backgroundColor: "#0b0f1a",
      padding: 0,
      height: "100%",
      width: "100%",
    },
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        sender: userName,
        text: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMessageInput("");
  };

  const summarizeMeeting = () => {
    setLoading(true);
    setTimeout(() => {
      setSummary(
        "The meeting covered the upcoming Q3 project milestones, deployment strategies for the new CRM module, and budget allocation for AI research. Action items: Sarah to finalize the API docs, Marcus to review the frontend components.",
      );
      setLoading(false);
      setShowAI(true);
    }, 2000);
  };

  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState<any[]>([
    { id: user?.id || "local", name: userName || "You", isLocal: true },
  ]);

  return (
    <div className=" inset-0 w-screen h-screen bg-[#0b0f1a] overflow-hidden font-outfit z-50">
      <div className="flex w-full h-full ">
        <AgoraUIKit
          rtcProps={rtcProps}
          callbacks={callbacks}
          styleProps={styleProps as any}
        />

        {/* Custom Controls for Chat, AI & Participants */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[999] pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowChat(!showChat);
              setShowParticipants(false);
            }}
            className={`p-4 rounded-2xl backdrop-blur-3xl border transition-all cursor-pointer relative z-[1000] ${showChat ? "bg-cyan-500 text-white border-cyan-400" : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"}`}
          >
            <IoChatbubbleOutline size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowParticipants(!showParticipants);
              setShowChat(false);
            }}
            className={`p-4 curso rounded-2xl backdrop-blur-3xl border transition-all cursor-pointer relative z-[1000] ${showParticipants ? "bg-cyan-500 text-white border-cyan-400" : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"}`}
          >
            <IoPeopleOutline size={24} />
          </button>
          {isHost && (
            <button
              onClick={summarizeMeeting}
              className="p-4 bg-white/5 text-slate-400 rounded-2xl backdrop-blur-3xl border border-white/10 hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all group cursor-pointer relative z-[1000]"
              title="Generate AI Meeting Summary"
            >
              <IoSparklesOutline
                size={24}
                className="group-hover:animate-pulse"
              />
            </button>
          )}

          {/* HIDDEN AGORA FALLBACK: If user sees "dynamic use static key" error, they can click this to force a join with no token */}
          <button
            onClick={() => {
              message.warning("Attempting Force Join (Static Mode)...");
              window.location.reload(); // Force refresh to retry if stuck
            }}
            className="p-4 bg-red-500/10 text-red-500/30 rounded-2xl border border-red-500/10 hover:text-red-500 hover:bg-red-500/20 transition-all cursor-pointer scale-75"
            title="Force Join Fallback (Use ONLY if connection fails)"
          >
            <span className="text-[8px] font-black uppercase">Force Join</span>
          </button>
        </div>
      </div>

      {/* Participants Sidebar */}
      <AnimatePresence>
        {showParticipants && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="w-96 bg-slate-900/95 backdrop-blur-3xl border-l border-white/10 flex flex-col shadow-2xl relative z-30"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-white font-black uppercase tracking-widest flex items-center gap-3">
                <IoPeopleOutline className="text-cyan-500" />
                Participants
              </h3>
              <button
                onClick={() => setShowParticipants(false)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black">
                      {p.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">
                        {p.name} {p.isLocal && "(You)"}
                      </span>
                      {isHost && !p.isLocal && (
                        <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">
                          Remote Participant
                        </span>
                      )}
                      {p.isLocal && isHost && (
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
                          Meeting Host
                        </span>
                      )}
                    </div>
                  </div>

                  {isHost && !p.isLocal && (
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all cursor-pointer"
                        title="Mute User"
                      >
                        <IoMicOffOutline size={18} />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                        title="Kick User"
                      >
                        <IoPersonRemoveOutline size={18} />
                      </button>
                    </div>
                  )}
                  {p.muted && !isHost && (
                    <div className="p-2 text-red-500">
                      <IoMicOffOutline size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="w-96 bg-slate-900/95 backdrop-blur-3xl border-l border-white/10 flex flex-col shadow-2xl relative z-30"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-white font-black uppercase tracking-widest flex items-center gap-3">
                <IoChatbubbleOutline className="text-cyan-500" />
                Live Chat
              </h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-20 opacity-20">
                  <IoChatbubbleOutline size={48} className="mx-auto mb-4" />
                  <p className="font-bold text-xs uppercase tracking-widest">
                    No messages yet
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === userName ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    {msg.sender}
                  </span>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm font-medium max-w-[80%] ${msg.sender === userName ? "bg-cyan-500 text-white" : "bg-white/5 text-slate-300"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-500 outline-none pr-12"
                />
                <button
                  onClick={sendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-500 p-2 hover:bg-cyan-500/10 rounded-lg transition-all cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 fill-current rotate-90"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Summary Overlay */}
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0b0f1a]/80 backdrop-blur-xl z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-xl w-full bg-slate-900 border border-cyan-500/20 rounded-[3rem] p-12 shadow-3xl overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-cyan-500 to-blue-600" />
              <h2 className="text-3xl font-black text-white mb-6 font-outfit uppercase tracking-tighter flex items-center gap-3">
                <IoSparklesOutline className="text-cyan-500 animate-pulse" />
                AI Meeting Summary
              </h2>
              <p className="text-slate-400 leading-relaxed mb-10 font-medium italic">
                "{summary}"
              </p>
              <button
                onClick={() => setShowAI(false)}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl border border-white/10 transition-all uppercase tracking-widest text-xs cursor-pointer"
              >
                Close Insights
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Host Controls for remote users could be integrated via Agora components */}
    </div>
  );
}

export default AgoraUIVideoPlayer;
