import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import Chat from "./Chat";
import Signin from "./Signin";

const IsAuth = () => {
  if (!API.isAuth()) return <Redirect to="/signin" noThrow />;
  else return <Chat />;
};

export default IsAuth;
