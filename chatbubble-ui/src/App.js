import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import styled from "@emotion/styled";
import Login from "./Login";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import Profile from "./Profile";
import Chat, { ChatComponent } from "./Chat";
import IsAuth from "./IsAuth";
import Loading from "./Loading";

// import { Loading } from "./Loading";
// import Firebase, { FirebaseContext } from "./firebase";

const App = () => {
  return (
    <React.StrictMode>
      {/* <FirebaseContext.Provider value={new Firebase()}> */}
      <div>
        <header>
          <Link to="/">ChatBubble</Link>
        </header>
        <Router>
          <IsAuth path="/" />
          <Profile path="/profile" />
          <Register path="/register" />
          <Login path="/login" />
          {/* <Loading path="/loading" /> */}
          <VerifyEmail path="/verify/:identity" />
        </Router>
      </div>
      {/* </FirebaseContext.Provider> */}
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
