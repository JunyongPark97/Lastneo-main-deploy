/* eslint-disable */
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router";
import HomeContainer from "./HomeContainer";
import FrontDoor from "./FrontDoor";
import Menu from "./Menu";
import GuestHome from "./GuestHome";

function NeoHome({ match }) {
  return (
    <>
      <Route exact path={match.path} component={HomeContainer} />
      <Route exact path={`${match.path}/frontdoor`} component={FrontDoor} />
      <Route exact path={`${match.path}/menu`} component={Menu} />
      <Route exact path={`${match.path}/guest`} component={GuestHome} />
    </>
  );
}

export default NeoHome;
