/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import RoomNav from "../../components/RoomNav";
import RoomDiv from "../../components/RoomDiv";
import Room from "./Sections/Room";
import Neo from "./Sections/Neo";
import GetNft from "./Sections/GetNft";
import Question from "./Sections/Question";
import { useSelector, useDispatch } from "react-redux";
import { getOwnerInfo } from "../../_actions/owner_action";

function NeoRoom() {
  const store = useSelector((store) => store.owner);
  const store_neohome = useSelector((store) => store.neohome);
  const dispatch = useDispatch();
  const myRef = useRef();
  const neoRef = useRef();
  const nftRef = useRef();
  const questionRef = useRef();

  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  useEffect(() => {
    dispatch(getOwnerInfo(store_neohome.nickname)).then((response) => {
      if (store_neohome.scroll) {
        // scroll이 true라는 건 NeoRoom-Question에서 인격담기를 했다는 뜻이므로 Owner임.
        executeScroll();
        dispatch({ type: "unset_scroll" });
      }
    });
  }, []);

  return (
    <>
      <Room store={store} neo={true} />
      <RoomDiv>
        <RoomNav>
          <div className="nav-menu">
            <span
              onClick={() => {
                neoRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              네오
            </span>
          </div>
          <div className="nav-menu">
            <span
              onClick={() => {
                nftRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              소유하기
            </span>
          </div>
          <div className="nav-menu">
            <span
              onClick={() => {
                myRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              인격 담기
            </span>
          </div>
        </RoomNav>
        <div ref={neoRef}>
          <Neo store={store} />
        </div>
        <div ref={nftRef}>
          <GetNft store={store} remain={store.neo_blocks.remain_block} />
        </div>
        <div ref={myRef}>
          <Question store={store} isDone={store.is_done} />
        </div>
      </RoomDiv>
    </>
  );
}

export default NeoRoom;
