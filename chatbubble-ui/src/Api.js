import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8000/api";

export default {
  login: function(send) {
    console.log("lol");
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

  postMessage: function(send) {
    console.log(send);
    return axios.post(`${burl}/messages`, send, {
      headers: headers
    });
  },

  getAllUsers: function() {
    return axios.get(`${burl}/users`);
  },

  getNodeUsers: function() {
    return axios.get(`${burl}/messages`);
  },

  getMessages: function(users) {
    return axios.get(`${burl}/messages/${users}`);
  },

  logout: function() {
    localStorage.clear();
  }
};
