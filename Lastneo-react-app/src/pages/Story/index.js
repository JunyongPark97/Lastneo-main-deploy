/* eslint-disable */
import React from "react";
import { Route } from "react-router";
import StoryPage from "./StoryPage";

function Story({ match }) {
  return (
    <>
      <Route exact path={match.path} component={StoryPage} />
    </>
  );
}

export default Story;
