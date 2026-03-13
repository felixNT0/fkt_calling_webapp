"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export type UserRole = "admin" | "user";
export type SubscriptionTier = "starter" | "pro" | "enterprise";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscription: SubscriptionTier;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: Omit<User, "id" | "role" | "subscription">) => void;
  logout: () => void;
  updateSubscription: (tier: SubscriptionTier) => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("app_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Also sync old ID if exists
    const oldId = localStorage.getItem("currentActiveUserId");
    if (oldId && !storedUser) {
        // Migration for existing users
        const mockUser: User = {
            id: oldId,
            name: "User_" + oldId.slice(0, 4),
            email: "user@example.com",
            role: "user",
            subscription: "starter"
        };
        setUser(mockUser);
        localStorage.setItem("app_user", JSON.stringify(mockUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: Omit<User, "id" | "role" | "subscription">) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      role: userData.email.includes("admin") ? "admin" : "user", // Simple mock logic
      subscription: "starter",
    };
    setUser(newUser);
    localStorage.setItem("app_user", JSON.stringify(newUser));
    localStorage.setItem("currentActiveUserId", newUser.id);
    localStorage.setItem("modal", "true");
    toast.success(`Welcome, ${newUser.name}!`);
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("app_user");
    localStorage.removeItem("modal");
    localStorage.removeItem("currentActiveUserId");
    toast.info("Logged out successfully");
    router.push("/");
  };

  const updateSubscription = (tier: SubscriptionTier) => {
    if (user) {
      const updatedUser = { ...user, subscription: tier };
      setUser(updatedUser);
      localStorage.setItem("app_user", JSON.stringify(updatedUser));
      toast.success(`Upgraded to ${tier.toUpperCase()} plan!`);
    } else {
      toast.error("Please sign in to choose a plan");
      router.push("/auth/signup");
    }
  };

  return (
    <UserContext.Provider value={{ 
        user, 
        isLoading, 
        login, 
        logout, 
        updateSubscription,
        isAdmin: user?.role === "admin"
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
