"use client";
import React from "react";
import styled from "styled-components";
import { useSettings } from "../context/ChatProvider";
import ChatContainer from "./ChatContainer";

const WrapperContainer = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;

const Wrapper = () => {
  return (
    <>
      <WrapperContainer>{<ChatContainer />}</WrapperContainer>
    </>
  );
};

export default Wrapper;
