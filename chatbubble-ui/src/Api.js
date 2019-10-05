import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8000/api";

export default {
  login: function(send) {
    return axios.post(`${burl}/login`, send, {
      headers: headers
    });
  },

  register: function(send) {
    return axios.post(`${burl}/users`, send, {
      headers: headers
    });
  },

  userupdate: function(id, send) {
    return axios.put(`${burl}/users/${id}`, send, {
      headers: headers
    });
  },

  isAuth: function() {
    return localStorage.getItem("token-chatbubble") !== null;
  },

  getAllUsers: function() {
    return axios.get(`${burl}/users`);
  },

  logout: function() {
    localStorage.clear();
  }
};
