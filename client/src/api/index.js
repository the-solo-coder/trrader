import axios from "axios";

const API = axios.create({ baseURL: "/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signUp = (formData) => API.post("/user/signup", formData);
export const login = (formData) => API.post("/user/signin", formData);
export const upDateAlert = (id, upDatedAlert) =>
  API.patch(`/binance/updateAlert/${id}`, upDatedAlert);
