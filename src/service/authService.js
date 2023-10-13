import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api, authApi } from "../api";
import { showToastSuccessMessage } from "../utils/toastUtils";

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
      // navigate("/");
    },
    onError: (res) => {},
  });
};

//-------------------------------------------------------------

const forgotPassword = async (email) => {
  const response = await api.put(`auth/forgotPassword`, email);

  return response.data;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      showToastSuccessMessage("Check your email");
    },
  });
};

//-------------------------------------------------------------

const resetPassword = async ({ token, email, formData }) => {
  console.log(
    "🚀 ~ file: authService.js:47 ~ resetPassword ~ formData:",
    formData,
  );
  console.log("🚀 ~ file: authService.js:47 ~ resetPassword ~ email:", email);
  console.log("🚀 ~ file: authService.js:47 ~ resetPassword ~ token:", token);

  const response = await api.put(`Auth/ChangePassword`, formData, {
    params: {
      email: email,
      token: token,
    },
  });
  return response.data;
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      showToastSuccessMessage("Check your email");
    },
  });
};

//-------------------------------------------------------------
