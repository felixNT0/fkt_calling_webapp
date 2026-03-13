"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "@/context/UserContext";
import { MeetingProvider } from "@/context/MeetingContext";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MeetingProvider>
          <ProgressProvider
            height="4px"
            color="#06b6d4"
            options={{ showSpinner: false }}
            shallowRouting
          >
            {children}
            <ToastContainer />
          </ProgressProvider>
        </MeetingProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
