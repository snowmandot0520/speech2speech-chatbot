"use client";

import React from "react";
import { AiFillWechat } from "react-icons/ai";
import styled from "styled-components";
import { useSettings } from "../context/ChatProvider";
import useChatActions from "../hooks/useChatActions";
import { ButtonContainer } from "../styled/Button";

const Nav = styled.nav`
  display: flex;
  width: 6.75em;
  gap: 20px;
  align-items: center;
  flex-direction: column;
  padding: 6vh 5px;
  background: #1a1a1a;

  & div {
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 820px) {
    width: 100%;
    height: 5%;
    flex-direction: row;
  }
`;

const Navigation = ({ openRoomNav }) => {
  const { leaveRoom } = useChatActions();
  const { setClicked, isClicked } = useSettings();

  return (
    <Nav>
      <ButtonContainer active={true}>
        <a href="#" style={{ padding: "0px" }}>
          <img src="/logo.gif" style={{ width: "inherit" }} />
        </a>
      </ButtonContainer>

      <ButtonContainer device="mobile" onClick={openRoomNav}>
        <a href="#">
          <AiFillWechat size="100%" />
        </a>
      </ButtonContainer>

      <ButtonContainer
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
        onMouseLeave={() => setClicked(false)}
      >
        <img
          className="start-img"
          src={isClicked ? "/stop.png" : "start.png"}
          style={{ width: 80 }}
        />
      </ButtonContainer>
    </Nav>
  );
};

export default Navigation;
