import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCategories = async () => {
  const response = await axios.get("https://localhost:7047/api/Categories");

  return response.data;
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
