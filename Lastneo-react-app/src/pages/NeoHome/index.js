/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router";
import HomeContainer from "./HomeContainer";
import FrontDoor from "./FrontDoor";
import Menu from "./Menu";
import EnterPw from "./EnterPw";
import { enterAddress } from "../../modules/login";
import { useDispatch } from "react-redux";
import NotFound from "../NotFound";

function NeoHome({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [complete, setComplete] = useState(false);
  // 서버에 match.path에 해당하는 닉네임이 존재하는 유저인지 확인하는 요청을 전송
  // 존재하지 않으면 404로 리다이렉트
  useEffect(() => {
    let body = { data: match.params.id };
    dispatch(enterAddress(body)).then((response) => {
      if (response.type == "login/ENTER_ADDRESS_FAILURE") {
        history.push("/404");
      } else {
        setComplete(true);
      }
    });
  }, []);

  return (
    <>
      <Route exact path="/404" component={NotFound} />
      {complete && <Route exact path={match.path} component={HomeContainer} />}
      <Route exact path={`${match.path}/frontdoor`} component={FrontDoor} />
      <Route exact path={`${match.path}/password`} component={EnterPw} />
      <Route exact path={`${match.path}/menu`} component={Menu} />
    </>
  );
}

export default NeoHome;
