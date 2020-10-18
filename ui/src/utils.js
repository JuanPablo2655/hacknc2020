import { sha256 } from "js-sha256";

const website = "http://localhost:8000";

export const create_fact = async (login_token, fact) => {
  let response = await fetch(`${website}/v1/create_fact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Login-Token": login_token.token,
    },
    body: JSON.stringify(fact),
  });
  return response.json();
};

export const get_fact = async (fact_id) => {
  let response = await fetch(`${website}/v1/get_fact/${fact_id}`);
  return response.json();
};

export const signup = async (username, email, password, signup_token) => {
  let hash = sha256.create();
  hash.update(password);
  hash.hex();
  let response = await fetch(`${website}/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password: hash.toString(),
      token: signup_token,
    }),
  });
  return response.json();
};

export const logout = async (user_token) => {
  let response = await fetch(`${website}/v1/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_token),
  });
  return response.json();
};

export const login = async (email, password) => {
  let hash = sha256.create();
  hash.update(password);
  hash.hex();
  let response = await fetch(`${website}/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: hash.toString(),
    }),
  });
  return response.json();
};

export const upload_document = async (login_token, document) => {
  let response = await fetch(`${website}/v1/upload_document`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      "Login-Token": login_token.token,
    },
    body: document,
  });
  return response.json();
};

export const search = async (query) => {
  let response = await fetch(`${website}/v1/search?q=${query}`);
  return response.json();
};

export default {
  login,
  logout,
  signup,
  get_fact,
  upload_document,
  search,
};
