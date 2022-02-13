/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
import * as Scroll from "react-scroll";
import { Link, Element } from "react-scroll";
import Room from "./Sections/Room";
import Frame from "./Sections/Frame";
import Communication from "./Sections/Communication";
import Character from "./Sections/Character";
import Item from "./Sections/Item";
import RoomNav from "../../components/RoomNav";
import RoomDiv from "../../components/RoomDiv";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerInfo } from "../../_actions/owner_action";

function CharacterRoom({ store, owner }) {
  const dispatch = useDispatch();
  const roomRef = useRef();
  const characterRef = useRef();
  const itemRef = useRef();
  const frameRef = useRef();
  const communicationRef = useRef();
  const store_neohome = useSelector((store) => store.neohome);

  const scrollToRoom = () =>
    roomRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  const scrollToFrame = () => {
    frameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    if (store_neohome.scroll) {
      // scroll이 true라는 건 NeoRoom-Question에서 인격담기를 했다는 뜻이므로 Owner임.
      dispatch(getOwnerInfo(store_neohome.nickname)).then((response) => {
        if (store_neohome.scroll_to == "character_room") {
          dispatch({ type: "unset_scroll" });
          scrollToRoom();
        } else if (store_neohome.scroll_to == "frame") {
          dispatch({ type: "unset_scroll" });
          scrollToFrame();
        }
      });
    }
  }, []);

  return (
    <>
      <div style={{ width: "100%" }} ref={roomRef}>
        <Room store={store} character />
      </div>
      <RoomDiv className="room-div">
        <RoomNav>
          <div className="nav-menu">
            <span
              onClick={() => {
                characterRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              네오 캐릭터
            </span>
          </div>
          <div className="nav-menu">
            <span
              onClick={() => {
                itemRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              아이템
            </span>
          </div>
          <div className="nav-menu">
            <span
              onClick={() => {
                frameRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              액자
            </span>
          </div>
          {owner && (
            <div className="nav-menu">
              <span
                onClick={() => {
                  communicationRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                소통하기
              </span>
            </div>
          )}
        </RoomNav>
        <div ref={characterRef}>
          <Character store={store} />
        </div>
        <div ref={itemRef}>
          <Item store={store} />
        </div>
        <div ref={frameRef}>
          <Frame store={store} owner={owner} />
        </div>
        {owner && (
          <div ref={communicationRef}>
            <Communication store={store} />
          </div>
        )}
      </RoomDiv>
    </>
  );
}

export default CharacterRoom;
