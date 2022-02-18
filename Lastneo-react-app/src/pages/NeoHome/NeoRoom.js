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
import { getOwnerInfo } from "../../modules/owner";
import { unsetScroll } from "../../modules/neohome";

function NeoRoom() {
  const store = useSelector((store) => store.owner);
  const store_neohome = useSelector((store) => store.neohome);
  const dispatch = useDispatch();
  const neoRef = useRef();
  const nftRef = useRef();
  const questionRef = useRef();

  const executeScroll = () =>
    questionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  useEffect(() => {
    dispatch(getOwnerInfo(store_neohome.nickname)).then((response) => {
      if (store_neohome.scroll) {
        // scroll이 true라는 건 NeoRoom-Question에서 인격담기를 했다는 뜻이므로 Owner임.
        executeScroll();
        dispatch(unsetScroll());
      }
    });
  }, []);

  return (
    <>
      <Room store={store} neo={true} />
      <RoomDiv>
        <RoomNav>
          <div className="nav-container">
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
                  questionRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                인격 담기
              </span>
            </div>
          </div>
        </RoomNav>
        <div ref={neoRef}>
          <Neo store={store} />
        </div>
        <div ref={nftRef}>
          <GetNft store={store} remain={store.neo_blocks.remain_block} />
        </div>
        <div ref={questionRef}>
          <Question store={store} isDone={store.is_done} />
        </div>
      </RoomDiv>
    </>
  );
}

export default NeoRoom;
