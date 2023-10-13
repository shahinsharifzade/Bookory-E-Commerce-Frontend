import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { showToastSuccessMessage } from "../utils/toastUtils";

const postMessage = async (data) => {
  const response = await api.post("contact", data);
  console.log(
    "🚀 ~ file: contactService.js:7 ~ postMessage ~ response:",
    response,
  );
  return response.data;
};

export const usePostMessage = () => {
  return useMutation({
    mutationFn: postMessage,
    onSuccess: () => {
      showToastSuccessMessage("Message Sended successfully");
    },
    onError: async (error) => {
      console.log(error.response.data.errors);
    },
  });
};
