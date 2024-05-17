import { useEffect, useState } from "react";
import { useSettings } from "../context/ChatProvider";

const useMessages = () => {
  const { currentRoom } = useSettings();
  const [messages, setMessages] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    setMessages([]);
  }, [currentRoom]);

  return messages;
};

export default useMessages;
