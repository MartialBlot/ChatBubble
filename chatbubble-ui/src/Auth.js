import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";

const Auth = () => {
  const [login, setLogin] = useState([]);
  const [password, setPassword] = useState([]);
  const [hidden, setHidden] = useState(false);

  //   return (
  //     <div>
  //       <h1>Auth</h1>
  //       <form
  //         onSubmit={() => {
  //           event.preventDefault();
  //           alert("lol fait le");
  //         }}
  //       >
  //         <label htmlFor="location">
  //           Login
  //           <input
  //             value={login}
  //             placeholder="johndoe"
  //             onChange={e => setLogin(e.target.value)}
  //           />
  //         </label>
  //         <label htmlFor="location">
  //           Password
  //           <input
  //             value={password}
  //             placeholder="password"
  //             onChange={e => setPassword(e.target.value)}
  //             type={hidden ? "password" : "text"}
  //           />
  //         </label>
  //         <button>Go to chat</button>
  //       </form>
  //       <button
  //         onClick={() => {
  //           event.preventDefault();
  //           setHidden(!hidden);
  //         }}
  //       >
  //         Hide/Show password
  //       </button>
  //       <Link to="/chat">Test route chat</Link>
  //     </div>
  //   );
  // };

  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form>
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
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form
          onSubmit={() => {
            event.preventDefault();
            alert("lol fait le");
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
            type="email"
            placeholder="Email"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <input
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={hidden ? "password" : "text"}
          />
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
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
