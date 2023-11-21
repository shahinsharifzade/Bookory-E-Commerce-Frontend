import { useGetActiveUser } from "../service/userService";

export const checkUser = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return true;
  } else {
    return false;
  }
};
