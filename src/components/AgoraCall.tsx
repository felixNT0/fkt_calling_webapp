"use client";
import { useState } from "react";
import Loader from "./Loader";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { getMeetingByIdMeeting } from "../api";
import MeetingDetailPage from "./MeetingDetails";
import AgoraUIVideoPlayer from "./Agora/AgoraUIVideoPlayer";
import { MdCall } from "react-icons/md";
import NavBar from "./NavBar";
import React from "react";

function AgoraCall() {
  const { id } = useParams();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, refetch } = useQuery(["Meeting-Id", id], () =>
    getMeetingByIdMeeting(id as string)
  );

  // const toggleStart = () => {
  //   setJoined(!joined);
  //   setLoading(!loading);
  // };

  React.useEffect(() => {
    if (joined) {
      setLoading(true);
    }
  }, [joined]);

  if (isLoading) return <Loader />;

  return (
    <>
      {!joined && <NavBar />}
      <div className="place-content-center text-center">
        {data && !joined && (
          <MeetingDetailPage
            title={data?.title}
            description={data?.description}
            date={data?.date}
            id={data?.id}
            refetch={refetch}
            user={data?.user}
            createAt={data?.createAt}
          />
        )}
        {loading && <Loader callConnection={true} />}
        {joined && data && (
          <AgoraUIVideoPlayer
            setJoined={setJoined}
            token={data?.token}
            channelName={data?.title}
            agoraAppId={data?.agoraAppId}
            setLoading={setLoading}
          />
        )}
        {!joined && (
          <div className="flex items-center justify-center">
            <button
              onClick={() => setJoined(true)}
              data-tooltip-target="tooltip-start-call"
              type="button"
              className="p-2.5 mt-5 text-center group rounded-lg text-white flex items-center focus:outline-none focus:ring-4 bg-green-500 hover:bg-gray-800"
            >
              <MdCall className="text-white mr-1" /> Start
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AgoraCall;
