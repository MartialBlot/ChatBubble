import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import Modal from "./Modal";
import { Loading } from "./Loading";

const Signup = () => {
  const [login, setLogin] = useState([]);
  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [password2, setPassword2] = useState([]);
  // const [hidden, setHidden] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [notgood, setNotgood] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const SendSignUp = async () => {
    if (
      !login ||
      login.length === 0 ||
      !name ||
      name.length === 0 ||
      !surname ||
      surname.length === 0 ||
      !email ||
      email.length === 0 ||
      !password ||
      password.length === 0 ||
      !password2 ||
      password2.length === 0 ||
      password !== password2
    ) {
      setNotgood(true);
      return;
    }
    try {
      const { data } = await API.signup({
        login,
        name,
        surname,
        email,
        password
      });
      if (data.success) {
        localStorage.setItem("token-chatbubble", data.token);
        setRedirect(true);
      } else {
        setNotgood(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        {redirect ? <Redirect to="/" noThrow /> : null}
        {showLoading ? (
          <Modal>
            <Loading />
          </Modal>
        ) : null}
        <form
          onSubmit={() => {
            event.preventDefault();
            setShowLoading(true);
            setNotgood(false);
            SendSignUp();
          }}
        >
          <h1>Create Account</h1>
          {/* <div className="social-container">
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
          <span>or use your email for registration</span> */}
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={e => setSurname(e.target.value)}
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
          <input
            type="password"
            placeholder="Verify password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
          {notgood ? (
            <div className="Wrong-password">Error, try again !</div>
          ) : null}
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
            <Link to="/signin">
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
