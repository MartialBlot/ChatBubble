import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
// import styled from "@emotion/styled";
import Signin from "./Signin";
import Signup from "./Signup";

import Chat from "./Chat";

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">ChatBubble</Link>
        </header>
        <Router>
          <Signin path="/" />
          <Signup path="/signup" />
          <Chat path="/chat" />
        </Router>
      </div>
    </React.StrictMode>
  );
};

// const Header = styled.header`
//   color: red;
// `;

render(<App />, document.getElementById("root"));
