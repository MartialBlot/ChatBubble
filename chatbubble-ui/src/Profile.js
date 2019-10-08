import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import Modal from "./Modal";
import { Loading } from "./Loading";

const Profile = () => {
  const [login, setLogin] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [good, setGood] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [notgood, setNotgood] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [message, setMessage] = useState("Error, please try again !");

  const SendLogin = async () => {
    setNotgood(false);
    setGood(false);
    if (password && password !== password2) {
      setMessage("Passwords don't match !");
      setShowLoading(false);
      setNotgood(true);
      return;
    }
    if (!password && !login && !fullname && !email) {
      setMessage("All fields are empty !");
      setShowLoading(false);
      setNotgood(true);
      return;
    }
    if (!login) {
      setMessage("Faut rentrer le login sinon ca marche pas pour linstant lol");
      setShowLoading(false);
      setNotgood(true);
      return;
    }
    let send = new Object();
    if (fullname) send.fullname = fullname;
    if (email) send.email = email;
    if (password) send.password = password;

    try {
      const { data } = await API.userupdate(login, send);
      if (data.success) {
        if (data.status) {
          setGood(true);
          setMessage(data.status);
        }
        setShowLoading(false);
      } else {
        if (data.status) {
          setNotgood(true);

          setMessage(data.status);
        } else {
          setNotgood(true);
          setMessage("Error, please try again !");
        }

        setShowLoading(false);
        setNotgood(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!API.isAuth()) setRedirect(true);
  }, []);

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
          <h1>Modify profile</h1>
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
            title="Must contain at least one letter, one number and 8 characters"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[A-z]).{8,}"
            title="Must contain at least one letter, one number and 8 characters"
            placeholder="Verify password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
          {notgood ? <div className="Wrong-password">{message}</div> : null}
          {good ? <div className="Good-password">{message}</div> : null}
          <button>Modify</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Go back to chat</h1>
            <Link to="/">
              <button className="ghost" id="signIn">
                Chat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
