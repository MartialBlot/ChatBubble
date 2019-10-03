import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8000/api";

export default {
  login: function(send) {
    return axios.post(`${burl}/signin/${send.login}`, send, {
      headers: headers
    });
  },

  signup: function(send) {
    return axios.post(`${burl}/signup/${send.login}`, send, {
      headers: headers
    });
  },

  verifyemail: function(send) {
    return axios.put(`${burl}/verify/${send.id}`, send, {
      headers: headers
    });
  },

  isAuth: function() {
    return localStorage.getItem("token-chatbubble") !== null;
  },

  logout: function() {
    localStorage.clear();
  }
};
