import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import AuthHelperMethods from "./AuthHelper";

import Chat, { ChatComponent } from "./Chat";
// import { getConfirm } from "./AuthHelper";
import decode from "jwt-decode";

const IsAuth = () => {
  if (!API.isAuth()) return <Redirect to="/login" noThrow />;
  const Auth = new AuthHelperMethods();
  let token = Auth.getToken();
  let response = Auth.isTokenExpired(token);
  if (response === true) {
    Auth.logout();
    console.log("Token expired, bye !");
  }
  if (!API.isAuth()) return <Redirect to="/login" noThrow />;
  else {
    console.log("You have a valid token, welcome !");
    return <ChatComponent />;
  }
};

export default IsAuth;
