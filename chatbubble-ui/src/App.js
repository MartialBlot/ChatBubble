import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
// import styled from "@emotion/styled";
import Auth from "./Auth";
import Chat from "./Chat";

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">ChatBubble</Link>
        </header>
        <Router>
          <Auth path="/" />
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
