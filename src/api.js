import axios from "axios";
import { useSelector } from "react-redux";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const usePrivateApi = () => {
  const token = useSelector((state) => state.auth.token);

  authApi.interceptors.request.use((config) => { 
    config.headers.Authorization = `Bearer ${token.token}`;
    return config;
  });

  return authApi;
};
