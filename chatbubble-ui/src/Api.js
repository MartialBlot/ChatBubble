import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8000/api";

export default {
  login: function(send) {
    console.log(send);
    return axios.post(`${burl}/signin/${send.login}`, send, {
      headers: headers
    });
  },

  signup: function(send) {
    return axios.post(`${burl}/signup/${send.login}`, send, {
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
