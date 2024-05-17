"use client";

import React from "react";
import styled from "styled-components";

const SearchRoomsContainer = styled.div`
  display: flex;
  background: #fff;
  width: 30%;
  padding-left: 1.2em;
  border-radius: 1.2em;

  & input {
    width: 85%;
    background: transparent;
    border: none;
  }

  @media (max-width: 820px) {
    display: none;
  }
`;

const SearchRooms = ({ query, setQuery }) => {
  return (
    <>
      <h1>Commune Speech to Speech</h1>
    </>
  );
};

export default SearchRooms;
