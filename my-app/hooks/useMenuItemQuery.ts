import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetchMenuItems = async () => {
  const { data } = await axios.get(`http://localhost:8800/api/menu/get`);
  return data;
};

export const useFetchMenuItemsQuery = () => {
  return useQuery<MenuItem[]>({
    queryKey: ["menu-items"],
    queryFn: () => fetchMenuItems(),
    staleTime: Infinity,
  });
};
