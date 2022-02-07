/* eslint-disable */
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router";
import HomeContainer from "./HomeContainer";
import FrontDoor from "./FrontDoor";
import Menu from "./Menu";

function NeoHome({ match }) {
  // 서버에 match.path에 해당하는 닉네임이 존재하는 유저인지 확인하는 요청을 전송
  // 존재하지 않으면 404로 리다이렉트
  useEffect(() => {
    console.log("neohome index");
  }, []);
  return (
    <>
      <Route exact path={match.path} component={HomeContainer} />
      <Route exact path={`${match.path}/frontdoor`} component={FrontDoor} />
      <Route exact path={`${match.path}/menu`} component={Menu} />
    </>
  );
}

export default NeoHome;
