"use client";
// import React from "react";
// import {
//   BsFillMicMuteFill,
//   BsFillMicFill,
//   BsFillCameraVideoOffFill,
//   BsFillCameraVideoFill,
// } from "react-icons/bs";
// import { MdCall, MdCallEnd } from "react-icons/md";

interface Props {
  joined: boolean;
  loading: boolean;
  allUsers: string[];
  handleStart: () => void;
  handleLeave: () => void;
  togglehandleMuteLocalTrack: () => void;
  muted: boolean;
  handleToggleVideoOffAndOn: () => void;
  videoOff: boolean;
}

const BottomActionButtons: React.FC<Props> = (
  {
    // joined,
    // loading,
    // allUsers,
    // handleStart,
    // handleLeave,
    // togglehandleMuteLocalTrack,
    // muted,
    // handleToggleVideoOffAndOn,
    // videoOff,
  }
) => {
  return (
    <></>
    // <div className="fixed bottom-0 left-0 right-0">
    //   <div className={`navbar_bg ${joined ? "w-fit" : ""}`}>
    //     <div className="w-full p-2 flex items-center justify-center">
    //       {joined && !loading && (
    //         <>
    //           {allUsers.length > 0 && (
    //             <>
    //               <button
    //                 onClick={togglehandleMuteLocalTrack}
    //                 data-tooltip-target="tooltip-microphone"
    //                 type="button"
    //                 className="p-2.5 group rounded-lg text-white flex items-center  mr-4 focus:outline-none focus:ring-4  focus:ring-gray-800 bg-gray-600 hover:bg-gray-800"
    //               >
    //                 {muted ? (
    //                   <>
    //                     <BsFillMicMuteFill className="text-white mr-1" /> Unmute
    //                   </>
    //                 ) : (
    //                   <>
    //                     <BsFillMicFill className="text-white mr-1" /> Mute
    //                   </>
    //                 )}
    //               </button>
    //               <button
    //                 onClick={handleToggleVideoOffAndOn}
    //                 data-tooltip-target="tooltip-camera"
    //                 type="button"
    //                 className="p-2.5  group rounded-lg text-white flex items-center  mr-4 focus:outline-none focus:ring-4  focus:ring-gray-800 bg-gray-600 hover:bg-gray-800"
    //               >
    //                 {videoOff ? (
    //                   <>
    //                     <BsFillCameraVideoOffFill className="text-white mr-1" />{" "}
    //                     on
    //                   </>
    //                 ) : (
    //                   <>
    //                     <BsFillCameraVideoFill className="text-white" /> off
    //                   </>
    //                 )}
    //                 {}
    //               </button>
    //             </>
    //           )}
    //         </>
    //       )}
    //       {!joined ? (
    //         <>
    //           {!loading && (
    //             <button
    //               onClick={handleStart}
    //               data-tooltip-target="tooltip-start-call"
    //               type="button"
    //               className="p-2.5 group rounded-lg text-white flex items-center focus:outline-none focus:ring-4 bg-green-500 hover:bg-gray-800"
    //             >
    //               <MdCall className="text-white mr-1" /> Start
    //             </button>
    //           )}
    //         </>
    //       ) : (
    //         <>
    //           {!loading && allUsers.length > 0 && (
    //             <button
    //               onClick={handleLeave}
    //               data-tooltip-target="tooltip-end-call"
    //               type="button"
    //               className="p-2.5 group rounded-lg text-white flex items-center  focus:outline-none focus:ring-4 focus:ring-gray-200  bg-red-500 hover:bg-gray-800"
    //             >
    //               <MdCallEnd className="text-white mr-1" /> End
    //             </button>
    //           )}
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default BottomActionButtons;
