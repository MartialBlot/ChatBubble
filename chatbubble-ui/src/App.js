import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
// import styled from "@emotion/styled";
import Signin from "./Signin";
import Signup from "./Signup";
import VerifyEmail from "./VerifyEmail";

import Chat, {ChatComponent} from './Chat'
import IsAuth from "./IsAuth";
import {Loading} from './Loading'

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">ChatBubble</Link>
        </header>
        <Router>
          <IsAuth path="/" />
          <Signup path="/signup" />
          <Signin path="/signin" />
          <Loading path="/loading"/>
          <ChatComponent path="/chat"/>
          <VerifyEmail path="/verify/:identity" />
        </Router>
      </div>
    </React.StrictMode>
  );
};

// const Header = styled.header`
//   color: red;
// `;

render(<App />, document.getElementById("root"));
