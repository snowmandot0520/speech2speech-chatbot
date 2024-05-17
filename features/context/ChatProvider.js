"use client";
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useSettings = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isClicked, setClicked] = useState(false);

  const value = {
    userName,
    setUserName,
    setCurrentRoom,
    currentRoom,
    isClicked,
    setClicked,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
