import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import Chat from "./Chat";
import Signin from "./Signin";

const IsAuth = () => {
  if (API.isAuth()) return <Redirect to="/chat" noThrow />;
  else return <Signin />;
};

export default IsAuth;
