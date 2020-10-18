import { sha256 } from "js-sha256";

const website = "http://localhost:8000";

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
export default {
  login,
  logout,
  signup,
  get_fact,
};
