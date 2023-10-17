import { useMutation } from "@tanstack/react-query";
import { api, authApi } from "../api";
import { showToastSuccessMessage } from "../utils/toastUtils";

const login = async (body) => {
  const response = await authApi.post("/auth/login", body, {
    withCredentials: true,
  });
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("token", JSON.stringify(res));
    },
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

const verifyAccount = async ({ token, email }) => {
  const response = await api.post("auth/verify", null, {
    params: {
      token: token,
      email: email,
    },
  });

  return response.data;
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyAccount,
    onSuccess: () => {
      showToastSuccessMessage(
        "Great! Email confirmation completed successfully",
      );
    },
  });
};

//-------------------------------------------------------------
