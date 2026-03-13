"use client";
import { useEffect, useRef, useState } from "react";
import SoundWave from "../SoundWave/SoundWave";

export const AgoraVideoPlayer = ({
  user,
  videoOff,
  activeUser,
  userId,
}: any) => {
  const ref = useRef<any>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    user?.videoTrack?.play(ref?.current);
  }, [user, videoOff]);

  useEffect(() => {
    if (ref.current && ref.current.videoWidth && ref.current.videoHeight) {
      setVideoDimensions({
        width: ref.current.videoWidth,
        height: ref.current.videoHeight,
      });
    }
  }, [ref.current?.videoWidth, ref.current?.videoHeight]);

  // Calculate dimensions after metadata is loaded
  const handleMetadataLoad = () => {
    if (ref.current) {
      setVideoDimensions({
        width: ref.current.videoWidth,
        height: ref.current.videoHeight,
      });
    }
  };

  return (
    <div
      className={`${
        userId === activeUser ? "relative flex justify-center items-center" : ""
      }`}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: videoOff
            ? `${(videoDimensions.height / videoDimensions.width) * 100}%`
            : "", // Maintain aspect ratio
        }}
      >
        {videoOff && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              zIndex: -1,
            }}
            className={`video_player rounded-[33px] mx-auto cursor-pointer shadow-sm hover:shadow-lg`}
          >
            {userId === activeUser && (
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 1 }}
              >
                <SoundWave />
              </span>
            )}
          </div>
        )}

        <video
          className={`video_player rounded-[33px] mx-auto cursor-pointer shadow-sm hover:shadow-lg ${
            videoOff ? "hidden" : ""
          }`}
          ref={ref}
          autoPlay={true}
          playsInline
          muted
          onLoadedMetadata={handleMetadataLoad}
        />

        {userId === activeUser && (
          <span
            className={`absolute bottom-[-65px] ml-[-30px]  transform -translate-y-1/2 ${
              videoOff ? "hidden" : ""
            }`}
          >
            <SoundWave />
          </span>
        )}
      </div>
    </div>
  );
};
