import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
// import styled from "@emotion/styled";
import Login from "./Login";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";

import Chat, { ChatComponent } from "./Chat";
import IsAuth from "./IsAuth";
import { Loading } from "./Loading";

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">ChatBubble</Link>
        </header>
        <Router>
          <IsAuth path="/" />
          <Register path="/register" />
          <Login path="/login" />
          <Loading path="/loading" />
          <ChatComponent path="/chat" />
          <VerifyEmail path="/verify/:identity" />
        </Router>
      </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
