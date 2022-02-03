/* eslint-disable */
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import EnterId from "./pages/Login/EnterId";
import Register from "./pages/Register";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Nav from "./components/Navbar";
import NeoHome from "./pages/NeoHome";
import ResetPw from "./pages/ResetPw";
import React from "react";
const AppBlock = styled.div`
  // height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: red; */
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AppBlock className="app-container">
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <Route exact path="/login" component={EnterId}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/resetpw" component={ResetPw}></Route>
            <Route path="/:id" component={NeoHome}></Route>
          </Switch>
        </AppBlock>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
