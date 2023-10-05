import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getStores = async (pageNumber, pageSize, search, sortBy) => {
  const params = {
    pageNumber,
    pageSize,
    "filters.Search": search,
    "filters.SortBy": sortBy,
  };

  const response = await axios.get(`https://localhost:7047/api/Company/paged`, {
    params: params,
  });
  console.log(response.data);
  return response.data;
};

export const useGetFilteredStores = (pageNumber, pageSize, search, sortBy) => {
  return useQuery({
    queryKey: ["company", pageNumber, pageSize, search, sortBy],
    queryFn: () => getStores(pageNumber, pageSize, search, sortBy),
  });
};

//

const getAll = async () => {
  var response = await axios.get("https://localhost:7047/api/Company");
  // console.log(response.data);
  return response.data;
};

export const useGetAll = () => {
  return useQuery({
    queryKey: ["company"],
    queryFn: () => getAll(),
  });
};
