import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import Chat, { ChatComponent } from "./Chat";

const IsAuth = () => {
  if (!API.isAuth()) return <Redirect to="/login" noThrow />;
  else return <ChatComponent />;
};

export default IsAuth;
