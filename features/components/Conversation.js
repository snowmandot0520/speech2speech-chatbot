"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "regenerator-runtime/runtime";
import TextToSpeech from "./Text2Speech";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
import { useSettings } from "../context/ChatProvider";

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  flex: 1;
  padding: 20px 0;
  overflow: auto;
`;

const MessageContent = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 300;
  padding: 0.8em 1em;
  margin: 0.8em 1em;
  width: fit-content;
  height: fit-content;
`;

const MessageContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  color: #fff;
  font-size: 1rem;
  flex-direction: ${(props) => (props.incomingMessage ? "row" : "row-reverse")};

  ${MessageContent} {
    margin-left: 50px;
    background: ${(props) =>
      props.incomingMessage ? "var(--blue-gradient)" : "#fff"};
    border: ${(props) =>
      props.incomingMessage ? "none" : "1px solid rgba(0, 0, 0, 0.1)"};
    color: ${(props) => (props.incomingMessage ? "#fff" : "#000")};
    box-shadow: ${(props) =>
        props.incomingMessage
          ? "rgba(32, 112, 198, 0.4)"
          : "rgba(0, 0, 0, 0.15)"}
      2px 3px 15px;
    border-radius: ${(props) =>
      props.incomingMessage ? "0 8px 8px 8px" : "8px 0 8px 8px"};
  }
`;

const BotProfile = styled.div`
  display: flex;
`;
const UserMessage = styled.div`
  width: fit-content;
  padding: 0.8em 1em;
  margin: 0.8em 0.8em;
  font-size: 16px;
  text-align: left;
  border-radius: 2em;
  background: rgba(0, 0, 0, 0.05);
`;

const Conversation = () => {
  const { isClicked, currentRoom } = useSettings();
  const [currentChat, setCurrentChat] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [chats, setChats] = useState([]);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, currentChat]);

  useEffect(() => {
    if (isClicked && transcript) setCurrentChat(transcript);
    else {
      resetTranscript();
      setCurrentChat("");
    }
  }, [transcript]);

  useEffect(() => {
    if (isClicked) {
      SpeechRecognition.startListening({
        continuous: true,
        language: currentRoom.description,
      });
    } else {
      SpeechRecognition.stopListening();
      resetTranscript();
      setCurrentChat("");
      if (currentChat) {
        setChats((prevChats) => [
          ...prevChats,
          {
            content: currentChat,
            role: "user",
          },
        ]);

        const getResponse = async () => {
          const response = await axios.post("/api/ChatResponse", {
            message: { role: "user", content: currentChat },
            language: currentRoom.name,
          });

          const answer = response.data.answer;
          setCurrentAnswer(answer);

          setChats((prevChats) => [
            ...prevChats,
            {
              content: answer,
              role: "bot",
            },
          ]);
        };

        getResponse();
      }
    }
  }, [isClicked]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <ConversationContainer ref={chatContainerRef}>
      {chats.map((chat, index) => {
        const { content, role } = chat;

        const isUser = role === "user";

        return isUser ? (
          <BotProfile>
            <img
              src="/user.png"
              style={{ width: "45px", height: "45px", marginTop: "4px" }}
            />
            <UserMessage>{content}</UserMessage>
          </BotProfile>
        ) : (
          <MessageContainer key={index}>
            <img
              src="/bot.png"
              style={{ width: "45px", height: "45px", marginTop: "4px" }}
            />
            <MessageContent>{content}</MessageContent>
          </MessageContainer>
        );
      })}
      {currentChat && (
        <BotProfile>
          <img
            src="/user.png"
            style={{ width: "45px", height: "45px", marginTop: "4px" }}
          />
          <UserMessage>{currentChat}</UserMessage>
        </BotProfile>
      )}
      {currentAnswer && (
        <TextToSpeech text={currentAnswer} lang={currentRoom.description} />
      )}
    </ConversationContainer>
  );
};

export default Conversation;
