import { authHeader } from "../utils/authHeader";

const baseUrl = "https://localhost:5001";
const fetch = require("node-fetch");

export const userService = {
  login,
  logout,
  register,
  getById,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${baseUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
};

function logout() {
  localStorage.removeItem("user");
};

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${baseUrl}/users/${id}`, requestOptions).then(handleResponse);
};

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${baseUrl}/users/register`, requestOptions)
    .then(handleResponse);
};

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};
