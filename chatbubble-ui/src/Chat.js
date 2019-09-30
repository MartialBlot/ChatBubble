import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "@reach/router";
import API from "./Api";

const Chat = () => {
  const [redirect, setRedirect] = useState(false);
  if (!API.isAuth()) return <Redirect to="/" noThrow />;
  return (
    <div>
      <div>
        <h1>Chat</h1>
        <h2>You are connected !</h2>
      </div>
      {redirect ? <Redirect to="/" noThrow /> : null}
      <div>
        <button
          onClick={() => {
            API.logout();
            setRedirect(true);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Chat;
