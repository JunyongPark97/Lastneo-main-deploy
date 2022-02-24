/* eslint-disable */
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import EnterId from "./pages/Login/EnterId";
import Register from "./pages/Register";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import NeoHome from "./pages/NeoHome";
import ResetPw from "./pages/ResetPw";
import React from "react";
import NotFound from "./pages/NotFound";
import { Helmet, HelmetProvider } from "react-helmet-async";
import favicon from "./assets/favicon.ico";
import mainImg from "./assets/main_web.png";
import Community from "./pages/Community";
import Story from "./pages/Story";

const AppBlock = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  /* background: blue; */
`;

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  window.addEventListener("resize", () => setScreenSize());
  const currentUrl = document.location.href;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <HelmetProvider>
          <Helmet>
            <title>라스트네오</title>
            <link rel="icon" href={favicon} />
            <meta property="og:url" content={currentUrl} />
            {/* title 정보 */}
            <meta property="og:title" content="라스트네오 홈페이지" />
            {/* 페이지 상세 정보 */}
            <meta property="og:description" content="Lastneno HomePage" />
            {/* 페이지 대표 이미지 정보 */}
            <meta property="og:image" content={mainImg} />

            {/* 트위터 메타 정보 */}
            <meta name="twitter:title" content="라스트네오 홈페이지" />
            <meta name="twitter:description" content="Lastneno HomePage" />
            <meta name="twitter:image" content={mainImg} />
          </Helmet>
          <AppBlock className="app-container">
            <Switch>
              <Route exact path="/" component={LandingPage}></Route>
              <Route exact path="/login" component={EnterId}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/resetpw" component={ResetPw}></Route>
              <Route path="/404" component={NotFound}></Route>
              <Route path="/community" component={Community}></Route>
              <Route path="/story" component={Story}></Route>
              <Route path="/:id" component={NeoHome}></Route>
            </Switch>
          </AppBlock>
        </HelmetProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
