/* eslint-disable */
import React from "react";
import { Route } from "react-router-dom";
import PhoneNum from "./PhoneNum";
import AuthNum from "./Authnum";
import Password from "./Password";
import Navbar from "../../components/Navbar";

function ResetPw({ match }) {
  return (
    <>
      <Navbar goBack={true} />
      <Route exact path={match.path} component={PhoneNum}></Route>
      <Route path={`${match.path}/authnum`} component={AuthNum}></Route>
      <Route path={`${match.path}/password`} component={Password}></Route>
    </>
  );
}

export default ResetPw;
