import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";

const Signin = () => {
  const [login, setLogin] = useState([]);
  const [password, setPassword] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [notgood, setNotgood] = useState(false);

  const SendSignIn = async () => {
    if (!login || login.length === 0 || !password || password.length === 0) {
      setNotgood(true);
      return;
    }
    // if (!password || password.length === 0) {
    //   return;
    // }
    try {
      const { data } = await API.login({ login, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setRedirect(true);
      } else {
        setNotgood(true);
        // console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        {redirect ? <Redirect to="/chat" noThrow /> : null}
        <form
          onSubmit={() => {
            event.preventDefault();
            setNotgood(false);
            SendSignIn();
          }}
        >
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <input
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={hidden ? "password" : "text"}
          />
          {notgood ? (
            <div className="Wrong-password">
              Wrong login or password, try again !
            </div>
          ) : null}
          <a
            href=""
            onClick={() => {
              event.preventDefault();
              setHidden(!hidden);
            }}
          >
            Show/Hide password
          </a>
          <button>Sign In</button>
          <a href="#">Forgot your password?</a>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <Link to="/signup">
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
