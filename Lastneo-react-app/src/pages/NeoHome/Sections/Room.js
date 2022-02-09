/* eslint-disable */
import React from "react";
import styled from "styled-components";
import images from "../../../assets";
import { customMedia } from "../../../styles/GlobalStyle";

const RoomSection = styled.section`
  background-color: ${(props) => props.theme.palette.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 848px;
  div.room-wrapper {
    position: relative;
    height: 728px;
    width: 640px;
  }
  img.room {
    height: 728px;
    width: 640px;
  }
  img.neo {
    height: 384px;
    width: 384px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  img.neo-soul {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  ${customMedia.lessThan("mobile")`
  width: 100%;
  height: calc((100vw - 48px) * 1.1375 + 48px);
  img.room {
    height: calc((100vw - 48px) * 1.1375);
    width: calc(100vw - 48px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  img.neo {
    height: auto;
    width: calc((100vw - 48px) * 0.6);
  }
  img.neo-soul {
    height: calc((100vw - 48px) * 1.1375);
    width: calc(100vw - 48px);
  }
  
    `}
`;
function Room({ store, neo, character }) {
  return (
    <RoomSection>
      <div className="room-wrapper">
        {neo && <img className="room" src={images.neosoulroom} />}
        {character && <img className="room" src={store.neo_room_image} />}
        {neo && <img className="neo-soul" src={images.roomneo} />}
        {character && <img className="neo" src={store.neo_image} />}
      </div>
    </RoomSection>
  );
}

export default Room;
