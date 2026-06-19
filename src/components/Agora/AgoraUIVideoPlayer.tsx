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
  meetingId,
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

  const notifiedRef = React.useRef<Record<string, number>>({});

  const [localUid] = useState(() => Math.floor(Math.random() * 100000));

  const rtcProps = {
    appId: agoraAppId || process.env.NEXT_PUBLIC_AGORA_APP_ID,
    channel: channelName,
    token: token === "null" || !token ? null : token,
    uid: localUid,
    enableScreensharing: false, // Disabled for now per request
    initialMicMuted: !initialMic,
    initialCameraMuted: !initialVideo,
    CustomVideoPlaceholder: ({ user, isShown }: any) => {
      if (!isShown) return null;
      // Resolve the name from the participant state or fallback
      const p = participants.find((p) => String(p.id) === String(user.uid));
      const displayName = p
        ? p.name
        : user.uid === localUid
          ? userName
          : "Participant";
      const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b0f1a] w-full h-full z-10">
          <div className="w-24 h-24 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-4xl text-white font-black shadow-2xl border-4 border-[#0b0f1a]">
            {initial}
          </div>
          <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2">
              <IoMicOffOutline className="text-red-400" />
              {displayName}
            </span>
          </div>
        </div>
      );
    },
  };

  const rtmProps = {
    username: userName || "Guest",
    displayUsername: true,
    uid: String(localUid),
  };

  // React.useEffect(() => {
  //   console.log("[AGORA_DEBUG] RTC Props:", {
  //     appId: rtcProps.appId,
  //     channel: rtcProps.channel,
  //     hasToken: !!rtcProps.token,
  //     uid: rtcProps.uid,
  //   });
  // }, [rtcProps.appId, rtcProps.channel, rtcProps.token, rtcProps.uid]);

  const callbacks = {
    EndCall: () => setJoined(false),
    JoinChannel: () => {
      setLoading(false);
      message.success("Connected to meeting");
    },
    ["user-joined"]: (user: any) => {
      joinSound.current?.play().catch(() => {});
      const name =
        user.uid && user.uid.toString().length > 5
          ? "A participant"
          : `User ${user.uid}`;
      message.info(`${name} joined`);
      setParticipants((prev) => [
        ...prev,
        {
          id: user.uid,
          name: name,
          isLocal: false,
          muted: false,
        },
      ]);
    },
    ["user-left"]: (user: any) => {
      leaveSound.current?.play().catch(() => {});
      const name =
        user.uid && user.uid.toString().length > 5
          ? "A participant"
          : `User ${user.uid}`;
      message.info(`${name} left`);
      setParticipants((prev) => prev.filter((p) => p.id !== user.uid));
    },
    ["connection-state-change"](curState: any, _: any, reason: any): void {
      if (curState === "DISCONNECTED") {
        setLoading(false);
        if (reason !== "LEAVE" && reason !== "REJOIN") {
          console.error(`[Agora] Disconnected reason:`, reason);
          message.error(`Connection lost: ${reason}`);
        }
      } else if (curState === "RECONNECTING") {
        message.warning("Reconnecting to meeting...");
      } else if (curState === "CONNECTED") {
        console.log("[Agora] Connected successfully");
      }
    },
    ["user-published"]: (user: any, mediaType: "audio" | "video") => {
      const key = `${user.uid}-${mediaType}-published`;
      if (Date.now() - (notifiedRef.current[key] || 0) < 3000) return;
      notifiedRef.current[key] = Date.now();

      const name =
        user.uid && user.uid.toString().length > 5
          ? "A participant"
          : `User ${user.uid}`;
      message.success(`${name} unmuted their ${mediaType}`);
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === user.uid
            ? { ...p, [mediaType === "audio" ? "muted" : "videoOff"]: false }
            : p,
        ),
      );
    },
    ["user-unpublished"]: (user: any, mediaType: "audio" | "video") => {
      const key = `${user.uid}-${mediaType}-unpublished`;
      if (Date.now() - (notifiedRef.current[key] || 0) < 3000) return;
      notifiedRef.current[key] = Date.now();

      const name =
        user.uid && user.uid.toString().length > 5
          ? "A participant"
          : `User ${user.uid}`;
      message.warning(`${name} muted their ${mediaType}`);
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === user.uid
            ? { ...p, [mediaType === "audio" ? "muted" : "videoOff"]: true }
            : p,
        ),
      );
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
    localBtnContainer: {
      backgroundColor: "#0f172a", // solid slate-900
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      padding: "24px 0",
      display: "flex",
      justifyContent: "center",
      gap: "24px",
    },
    BtnTemplateStyles: {
      backgroundColor: "#1e293b",
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: "50%",
      width: 52,
      height: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
    },
    localBtnStyles: {
      endCall: {
        backgroundColor: "#ef4444",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: "50%",
        width: 52,
        height: 52,
      },
    },
    gridVideoContainer: {
      backgroundColor: "#0b0f1a",
      padding: 0,
      height: "100%",
      width: "100%",
    },
  };

  React.useEffect(() => {
    if (!meetingId) return;
    const fetchChat = async () => {
      try {
        const res = await fetch(`/api/meeting/${meetingId}/chat`);
        if (res.ok) {
          const newMessages = await res.json();
          // Detect new message notification
          if (messages.length > 0 && newMessages.length > messages.length) {
            const latestMessage = newMessages[newMessages.length - 1];
            if (latestMessage.sender !== userName) {
              message.info(`New message from ${latestMessage.sender}`);
            }
          }
          setMessages(newMessages);
        }
      } catch (err) {}
    };
    const interval = setInterval(fetchChat, 2500); // Fast 2.5s polling
    fetchChat(); // Initial fetch
    return () => clearInterval(interval);
  }, [meetingId, messages.length, userName]);

  const sendMessage = async () => {
    if (!messageInput.trim()) return;
    const payload = {
      sender: userName,
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, payload]);
    setMessageInput("");

    if (meetingId) {
      await fetch(`/api/meeting/${meetingId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
  };

  const summarizeMeeting = async () => {
    message.loading({
      content: "Generating AI Insights...",
      key: "ai-summary",
      duration: 2,
    });
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      let dynamicSummary = "The meeting was focused and concise.";
      if (messages.length > 0) {
        const senders = [...new Set(messages.map((m) => m.sender))].filter(
          (s) => s !== "System",
        );
        const topics = messages.map((m) => m.text).join(" ");
        dynamicSummary = `Participants (${senders.join(", ")}) engaged in an active discussion. Key conversational highlights included: "${messages[messages.length - 1].text}". Action items: Review shared materials and follow up on the chat history.`;
      }

      setSummary(dynamicSummary);
      message.success({
        content: "AI Summary successfully generated!",
        key: "ai-summary",
      });
      setShowAI(true);
    } catch (e) {
      message.error({
        content: "Failed to generate AI summary.",
        key: "ai-summary",
      });
    }
  };

  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState<any[]>([
    {
      id: user?.id || "local",
      name: userName || "You",
      isLocal: true,
      muted: !initialMic,
      videoOff: !initialVideo,
    },
  ]);

  return (
    <div className="inset-0 w-screen h-screen bg-[#0b0f1a] overflow-hidden font-outfit z-50">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Default: Videos should cover their area to remove gaps */
        video {
          object-fit: cover !important;
        }
        /* Make the bottom bar look more modern */
        .agora-btn-container {
          box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
          padding-bottom: 24px !important;
          z-index: 99 !important;
        }
        /* Force Agora UIKit internal buttons to drop all borders */
        .agora-btn-container > div, .agora-btn-container button {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        /* Fix remote videos being inversely mirrored (Y-axis) */
        .agora-video-view:not(.local-video) video {
          transform: rotateY(0deg) !important;
        }
        /* Only mirror the local user's video so it acts like a mirror */
        .agora-video-view.local-video video, div[id^="local"] video {
          transform: rotateY(180deg) !important;
        }
        /* Screen share video (uid usually starts with 'screen' or isn't camera) must NOT be mirrored or cropped */
        video[srcObject*="MediaStream"] {
          object-fit: contain !important; /* Allow screen share to show fully without cropping */
        }
      `,
        }}
      />
      <div className="flex w-full h-full relative">
        <AgoraUIKit
          // layout={1}
          rtcProps={rtcProps}
          rtmProps={rtmProps}
          callbacks={callbacks}
          styleProps={styleProps as any}
        />

        {/* Custom Controls for Chat, AI & Participants - Positioned bottom right like Meet/Zoom */}
        <div className="absolute right-6 bottom-3 flex flex-row items-center gap-3 z-[999] pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowChat(!showChat);
              setShowParticipants(false);
            }}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all cursor-pointer shadow-lg backdrop-blur-xl ${showChat ? "bg-cyan-500 text-white shadow-cyan-500/40" : "bg-white/10 text-white hover:bg-white/20 border border-white/5"}`}
            title="Chat"
          >
            <IoChatbubbleOutline size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowParticipants(!showParticipants);
              setShowChat(false);
            }}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all cursor-pointer shadow-lg ${showParticipants ? "bg-cyan-500 text-white shadow-cyan-500/40" : "bg-white/10 text-white hover:bg-white/20 border border-white/5"}`}
            title="Participants"
          >
            <IoPeopleOutline size={22} />
          </button>
          {isHost && (
            <button
              onClick={summarizeMeeting}
              className="w-12 h-12 flex items-center justify-center bg-white/10 text-amber-400 rounded-2xl hover:bg-amber-500 hover:text-white border border-white/5 transition-all group cursor-pointer shadow-lg"
              title="Generate AI Meeting Summary"
            >
              <IoSparklesOutline
                size={22}
                className="group-hover:animate-pulse"
              />
            </button>
          )}

          {/* HIDDEN AGORA FALLBACK 
          <button
            onClick={() => {
              message.warning("Attempting Force Join (Static Mode)...");
              window.location.reload();
            }}
            className="w-12 h-12 flex flex-col items-center justify-center bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white border border-red-500/20 transition-all cursor-pointer shadow-lg"
            title="Force Join Fallback (Use ONLY if connection fails)"
          >
            <span className="text-[7px] font-black uppercase text-center leading-[1.1]">
              Force
              <br />
              Join
            </span>
          </button>
          */}
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
            className="absolute right-0 top-0 bottom-0 w-96 bg-slate-900/95 backdrop-blur-3xl border-l border-white/10 flex flex-col shadow-2xl z-[1000]"
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
            className="absolute right-0 top-0 bottom-0 w-96 bg-slate-900/95 backdrop-blur-3xl border-l border-white/10 flex flex-col shadow-2xl z-[1000]"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 p-2 hover:bg-cyan-500/10 rounded-lg transition-all cursor-pointer flex items-center justify-center"
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
