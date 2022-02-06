/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-scroll";
import RoomNav from "../../components/RoomNav";
import RoomDiv from "../../components/RoomDiv";
import Room from "./Sections/Room";
import Neo from "./Sections/Neo";
import GetNft from "./Sections/GetNft";
import Question from "./Sections/Question";
import { useSelector } from "react-redux";

function NeoRoom() {
  const store = useSelector((store) => store.owner);
  console.log(store);

  return (
    <>
      <Room store={store} />
      <RoomDiv>
        <RoomNav>
          <Link to="neo" spy={true} smooth={true}>
            <span>네오</span>
          </Link>
          <Link to="getNft" spy={true} smooth={true}>
            <span>소유하기</span>
          </Link>
          <Link to="question" spy={true} smooth={true}>
            <span>인격 담기</span>
          </Link>
        </RoomNav>
        <section name="neo">
          <Neo store={store} />
        </section>
        <section name="getNft">
          <GetNft store={store} remain={store.neo_blocks.remain_block} />
        </section>
        <section name="question">
          <Question store={store} isDone={store.is_done} />
        </section>
      </RoomDiv>
    </>
  );
}

export default NeoRoom;
