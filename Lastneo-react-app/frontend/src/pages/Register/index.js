/* eslint-disable */
import React from "react";
import { Route } from "react-router-dom";
import PhoneNum from "../Register/PhoneNum";
import AuthNum from "../Register/AuthNum";
import Mbti from "./Mbti";
import Values from "./Values";
import Nickname from "./Nickname";
import Password from "./Password";
import Result from "./Result";
import Navbar from "../../components/Navbar";

function Register({ match }) {
  return (
    <>
      <Navbar goBack={true} />
      {/* <Route exact path={match.path} component={Main}></Route> */}
      <Route exact path={`${match.path}`} component={PhoneNum}></Route>
      <Route path={`${match.path}/authnum`} component={AuthNum}></Route>
      <Route path={`${match.path}/mbti`} component={Mbti}></Route>
      <Route path={`${match.path}/values`} component={Values}></Route>
      <Route path={`${match.path}/nickname`} component={Nickname}></Route>
      <Route path={`${match.path}/password`} component={Password}></Route>
      <Route path={`${match.path}/result`} component={Result}></Route>
    </>
  );
}

export default Register;
