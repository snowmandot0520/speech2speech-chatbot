"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import { useSettings } from "../context/ChatProvider";
import useChatActions from "../hooks/useChatActions";
import useDebounce from "../hooks/useDebounce";
import { Description } from "../styled/Description";

const LanguageListContainer = styled.div`
  --space: 1em;
  --horizontal-space: 2vw;

  display: flex;
  flex-direction: column;
  width: 18%;
  height: 100%;
  padding-top: var(--vertical-padding);
  overflow: auto;
  border-top-left-radius: 45px;
  border-bottom-left-radius: 45px;
  background: var(--blue-gradient);
  color: #fff;

  & h3 {
    font-size: 1.2em;
    font-weight: 500;
    padding: 0.9em var(--horizontal-space);
  }

  @media (max-width: 820px) {
    position: absolute;
    opacity: ${(props) => (props.open ? "1" : "0")};
    pointer-events: ${(props) => (props.open ? "null" : "none")};
    right: 0;
    width: 100%;
    border-radius: 0;
    z-index: 1;
  }
`;

const LanguageListItem = styled.li`
  display: flex;
  gap: 1vw;
  width: 100%;
  flex: 1;
  padding: var(--space) var(--horizontal-space);
  list-style: none;
  background: ${(props) =>
    props.active ? "var(--blue-active-color)" : "transparent"};
  cursor: pointer;
  transition: all 0.05s;

  &:hover {
    background: var(--blue-active-color);
  }

  & img {
    height: 3vw;
    width: 3vw;
    border-radius: 20px;
    object-fit: cover;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  & span {
    font-weight: 500;
    font-size: 0.8em;
  }
`;

// Static rooms in the chat
const rooms = [
  {
    id: 1,
    name: "English(US)",
    src: "./icons8-usa-48.png",
    description: "en-US",
  },
  {
    id: 2,
    name: "Russian",
    src: "./icons8-russia-48.png",
    description: "ru",
  },
  {
    id: 3,
    name: "English (Australia)",
    src: "./icons8-australia-48.png",
    description: "en-AU",
  },
  {
    id: 4,
    name: "Arabic (Bahrain)",
    src: "./icons8-bahrain-circular-48.png",
    description: "ar-BH",
  },
  {
    id: 5,
    name: "Bulgarian ",
    src: "./icons8-bulgaria-48.png",
    description: "bg",
  },
  {
    id: 6,
    name: "English (Canada)",
    src: "./icons8-canada-48.png",
    description: "en-CA",
  },
  {
    id: 7,
    name: "Mandarin Chinese",
    src: "./icons8-china-48.png",
    description: "zh-CN",
  },
  {
    id: 8,
    name: "Czech",
    src: "./icons8-czech-republic-48.png",
    description: "cs",
  },
  {
    id: 9,
    name: "Arabic (Egypt)",
    src: "./icons8-egypt-48.png",
    description: "ar-EG",
  },
  {
    id: 10,
    name: "Finnish",
    src: "./icons8-finland-48.png",
    description: "fi",
  },
  {
    id: 11,
    name: "French",
    src: "./icons8-france-48.png",
    description: "fr-FR",
  },
  {
    id: 12,
    name: "English (India)",
    src: "./icons8-india-48.png",
    description: "en-IN",
  },
  {
    id: 13,
    name: "Arabic (Iraq) ",
    src: "./icons8-iraq-48.png",
    description: "ar-IQ",
  },
  {
    id: 14,
    name: "Italian ",
    src: "./icons8-italy-48.png",
    description: "it-IT",
  },
  {
    id: 15,
    name: "Japanese",
    src: "./icons8-japan-48.png",
    description: "ja",
  },
  {
    id: 16,
    name: "Arabic (Kuwait)",
    src: "./icons8-kuwait-48.png",
    description: "ar-KW",
  },
  {
    id: 17,
    name: "Arabic (Lebanon)",
    src: "./icons8-lebanon-48.png",
    description: "ar-LB",
  },
  {
    id: 18,
    name: "English (New Zealand) ",
    src: "./icons8-new-zealand-48.png",
    description: "en-NZ",
  },
  {
    id: 19,
    name: "Arabic (Qatar) ar-QA",
    src: "./icons8-qatar-48.png",
    description: "ar-QA",
  },
  {
    id: 20,
    name: "Arabic (Saudi Arabia)",
    src: "./icons8-saudi-arabia-48.png",
    description: "ar-SA",
  },
  {
    id: 21,
    name: "English (South Africa) ",
    src: "./icons8-south-africa-48.png",
    description: "en-ZA",
  },
  {
    id: 22,
    name: "Arabic (Algeria)",
    src: "./icons8-algeria-48.png",
    description: "ar-DZ",
  },
];

const LanguageList = ({ query, isNavOpen, setIsNavOpen }) => {
  const debouncedSearch = useDebounce(query, 350);
  const { joinRoom } = useChatActions();
  const { currentRoom, setCurrentRoom, userName } = useSettings();

  const filteredRooms = useMemo(() => {
    const filter = rooms.filter((room) => {
      const includesCaseInsensitive = {
        name: room.name.toLowerCase(),
        description: room.description.toLowerCase(),
      };

      const { name, description } = includesCaseInsensitive;

      return (
        name.includes(debouncedSearch.toLowerCase()) ||
        description.includes(debouncedSearch.toLowerCase())
      );
    });

    return filter;
  }, [debouncedSearch]);

  const handleRoomClick = (roomID) => {
    if (currentRoom?.id === roomID) {
      return;
    }

    const selectedRoom = rooms.find((room) => room.id === roomID);
    setCurrentRoom(selectedRoom);

    joinRoom({ roomID, userName });

    setIsNavOpen(false);
  };

  return (
    <LanguageListContainer open={isNavOpen}>
      <h3>Languages</h3>

      <ul>
        {filteredRooms.map((room) => {
          const { id, name, src, description } = room;

          return (
            <LanguageListItem
              active={currentRoom?.id === id}
              key={id}
              onClick={() => handleRoomClick(id)}
            >
              <img alt="room-img" src={src} />

              <div>
                <span>{name}</span>
                <Description color="rgba(254,254,254,0.5)" size="0.7em">
                  {description}
                </Description>
              </div>
            </LanguageListItem>
          );
        })}
      </ul>
    </LanguageListContainer>
  );
};

export default LanguageList;
