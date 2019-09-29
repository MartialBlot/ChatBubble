import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8000";

export default {
  login: function(login, password) {
    return axios.post(
      `${burl}/signin`,
      {
        login,
        password
      },
      {
        headers: headers
      }
    );
  },

  signup: function(send) {
    return axios.post(`${burl}/signup/${headers.login}`, send, {
      headers: headers
    });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  logout: function() {
    localStorage.clear();
  }
};