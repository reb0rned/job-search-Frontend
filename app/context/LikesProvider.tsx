"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LikesContextType = {
  liked: string[];
  toggleLike: (id: string) => void;
};

const LikeContext = createContext<LikesContextType | undefined>(undefined);

export const LikesProvider = ({ children }: { children: React.ReactNode }) => {
  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("likedPosts");
    try {
      const parsed = JSON.parse(data || "[]");
      if (Array.isArray(parsed)) {
        setLiked(parsed);
      }
    } catch {
      setLiked([]);
    }
  }, []);

  const toggleLike = (id: string) => {
    let updated: string[] = [];

    if (liked.includes(id)) {
      updated = liked.filter((item) => item !== id);
    } else {
      updated = [...liked, id];
    }

    setLiked(updated);
    localStorage.setItem("likedPosts", JSON.stringify(updated));
  };

  return (
    <LikeContext.Provider value={{ liked, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("Not wrapped by context!");
  }
  return context;
};
