import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";

const Auth = () => {
  const [login, setLogin] = useState("Nico");
  const [password, setPassword] = useState([]);
  const [hidden, setHidden] = useState(false);

  return (
    <div>
      <h1>Auth</h1>
      <form
        onSubmit={() => {
          event.preventDefault();
          alert("lol fait le");
        }}
      >
        <label htmlFor="location">
          Login
          <input
            value={login}
            placeholder="johndoe"
            onChange={e => setLogin(e.target.value)}
          />
        </label>
        <label htmlFor="location">
          Password
          <input
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            type={hidden ? "password" : "text"}
          />
        </label>
        <button>Go to chat</button>
      </form>
      <button
        onClick={() => {
          event.preventDefault();
          setHidden(!hidden);
        }}
      >
        Hide/Show password
      </button>
      <Link to="/chat">Test route chat</Link>
    </div>
  );
};

export default Auth;
