import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";

const login = async (body) => {
  const response = await authApi.post("/auth/login", body, {
    withCredentials: true,
  });

  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("token", JSON.stringify(res));
      navigate("/");
    },
    onError: (res) => {},
  });
};
