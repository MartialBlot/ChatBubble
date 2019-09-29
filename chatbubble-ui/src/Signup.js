import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import API from "./Api";

const Signup = () => {
  const [login, setLogin] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [hidden, setHidden] = useState(false);

  const SendSignUp = async () => {
    if (!login || login.length === 0) return;
    if (!email || email.length === 0) return;
    if (!password || password.length === 0) return;
    try {
      const { data } = await API.signup({ login, email, password });
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form
          onSubmit={() => {
            event.preventDefault();
            SendSignUp();
            // console.log({ login });
            // console.log({ password });
            // console.log({ email });
            // alert("lol fait le");
          }}
        >
          <h1>Create Account</h1>
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
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <Link to="/">
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;