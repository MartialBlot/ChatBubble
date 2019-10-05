import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import Chat, { ChatComponent } from "./Chat";
import { getConfirm } from "./AuthHelper";
import decode from "jwt-decode";

const IsAuth = () => {
  if (!API.isAuth()) return <Redirect to="/login" noThrow />;
  else {
    let answer = decode(localStorage.getItem("token-chatbubble"));
    console.log(answer);
    return <ChatComponent />;
  }
};

export default IsAuth;
