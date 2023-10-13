import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";

const register = async (body) => {
  console.log("🚀 ~ file: userService.js:6 ~ register ~ body:", body);
  const response = await authApi.post("/users", body);

  return response.data;
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/");
    },
  });
};
