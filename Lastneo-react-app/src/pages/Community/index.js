/* eslint-disable */
import React from "react";
import { Route } from "react-router";
import ComingSoon from "./ComingSoon";

function Community({ match }) {
  return (
    <>
      <Route exact path={match.path} component={ComingSoon} />
    </>
  );
}

export default Community;
