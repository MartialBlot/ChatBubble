import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import Modal from "./Modal";
import { Loading } from "./Loading";

const Register = () => {
  const [login, setLogin] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const [hidden, setHidden] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [notgood, setNotgood] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [message, setMessage] = useState("Error, please try again !");

  const SendLogin = async () => {
    if (
      !login ||
      login.length === 0 ||
      !fullname ||
      fullname.length === 0 ||
      !email ||
      email.length === 0 ||
      !password ||
      password.length === 0 ||
      !password2 ||
      password2.length === 0
    ) {
      setMessage("Please fill all the fields !");
      setShowLoading(false);
      setNotgood(true);
      return;
    }
    if (password !== password2) {
      setMessage("The two passwords don't match !");
      setShowLoading(false);
      setNotgood(true);
      return;
    }
    try {
      const { data } = await API.register({
        login,
        fullname,
        email,
        password
      });
      if (data.success) {
        // localStorage.setItem("token-chatbubble", data.token);
        setShowLoading(false);
        setRedirect(true);
      } else {
        if (data.status) {
          setMessage(data.status);
        } else {
          setMessage("Error, please try again !");
        }
        setShowLoading(false);
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
            SendLogin();
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
            placeholder="Full name"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[A-z]).{8,}"
            required
            title="Must contain at least one letter, one number and 8 characters"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[A-z]).{8,}"
            required
            title="Must contain at least one letter, one number and 8 characters"
            placeholder="Verify password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
          {notgood ? <div className="Wrong-password">{message}</div> : null}
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
            <Link to="/login">
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

export default Register;
