import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "@reach/router";
import API from "./Api";
import { Loading } from "./Loading";
import Modal from "./Modal";

const VerifyEmail = (props) => {
  const [showLoading, setShowLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const Emailverifapi = async (id) => {
    try {
      const { data } = await API.verifyemail({ id });
      if (data.success) {
        setShowLoading(false);
        setRedirect(true);
      } else {
        setShowLoading(false);
        setNotgood(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Emailverifapi(props.identity);
  }, []);

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        {redirect ? <Redirect to="/" noThrow /> : null}
        {showLoading ? (
          <Modal>
            <h1>VERIFYING EMAIL ...</h1>
            <Loading />
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyEmail;
