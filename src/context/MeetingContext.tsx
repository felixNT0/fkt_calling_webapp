"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createMeeting, generateAgoraToken } from "@/api";
import { useUser } from "./UserContext";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import CreateMeetingModal from "@/components/CreateMeetingModal";

interface MeetingContextType {
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  createMeeting: (val: any) => Promise<void>;
  isCreating: boolean;
  createdData: any;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createdData, setCreatedData] = useState<any>(null);

  const { mutateAsync, isLoading: isCreating } = useMutation(createMeeting, {
    onSuccess: (data) => {
      toast.success("Meeting Created Successfully");
      setCreatedData(data);
      queryClient.invalidateQueries("Meetings");
      queryClient.invalidateQueries("meetings"); // Invalidate profile meetings too
    },
    onError: () => {
      toast.error("An Error Occurred");
    },
  });

  const openCreateModal = () => {
    setCreatedData(null); // Reset created data when opening
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreatedData(null);
  };

  const handleCreateMeeting = async (val: any) => {
    const { title, description, startDate, accessLevel } = val;
    
    // Generate slug for reliable Agora channel names
    const slug = title
      .toLowerCase()
      .split(" ")
      .slice(0, 5)
      .join("-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    
    const uniqueSlug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;

    // Use uniqueSlug as the channel name for token generation
    const { token, agoraAppId } = await generateAgoraToken(uniqueSlug, startDate);
    
    if (token || token === null) { // Handle null for Testing Mode
      await mutateAsync({
        title,
        description,
        date: startDate,
        token,
        createAt: String(new Date()),
        id: uuidv4(),
        slug: uniqueSlug, // Save the slug we generated
        agoraAppId,
        user: user?.id || "guest",
        accessLevel,
      });
    }
  };

  return (
    <MeetingContext.Provider
      value={{
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        createMeeting: handleCreateMeeting,
        isCreating,
        createdData,
      }}
    >
      {children}
      <CreateMeetingModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        isLoading={isCreating}
        onSubmit={handleCreateMeeting}
        createdData={createdData}
      />
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error("useMeeting must be used within a MeetingProvider");
  }
  return context;
};
