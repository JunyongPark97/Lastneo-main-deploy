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
  const [tabState, setTabState] = useState(store_neohome.tab);
  const dispatch = useDispatch();
  const myRef = useRef();

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
        <section name="question" ref={myRef}>
          <Question store={store} isDone={store.is_done} />
        </section>
      </RoomDiv>
    </>
  );
}

export default NeoRoom;
