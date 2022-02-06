/* eslint-disable */
import React, { useRef, useEffect } from "react";
import { Link } from "react-scroll";
import Room from "./Sections/Room";
import Frame from "./Sections/Frame";
import Communication from "./Sections/Communication";
import Character from "./Sections/Character";
import Item from "./Sections/Item";
import RoomNav from "../../components/RoomNav";
import RoomDiv from "../../components/RoomDiv";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerInfo } from "../../_actions/owner_action";

function CharacterRoom({ store, owner }) {
  const dispatch = useDispatch();
  const myRef = useRef();
  const store_neohome = useSelector((store) => store.neohome);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  useEffect(() => {
    if (store_neohome.scroll) {
      dispatch(getOwnerInfo(store_neohome.nickname));
      dispatch({ type: "unset_scroll" });

      executeScroll();
    }
  }, []);
  return (
    <>
      <div style={{ width: "100%" }} ref={myRef}>
        <Room store={store} />
      </div>
      <RoomDiv className="room-div">
        <RoomNav>
          <Link to="character" spy={true} smooth={true}>
            <span>네오 캐릭터</span>
          </Link>
          <Link to="item" spy={true} smooth={true}>
            <span>아이템</span>
          </Link>
          <Link to="frame" spy={true} smooth={true}>
            <span>액자</span>
          </Link>
          {owner && (
            <Link to="communication" spy={true} smooth={true}>
              <span>소통하기</span>
            </Link>
          )}
        </RoomNav>
        <section name="character">
          <Character store={store} />
        </section>
        <section name="item">
          <Item store={store} />
        </section>
        <section name="frame">
          <Frame store={store} />
        </section>
        {owner && (
          <section name="communication">
            <Communication store={store} />
          </section>
        )}
      </RoomDiv>
    </>
  );
}

export default CharacterRoom;
