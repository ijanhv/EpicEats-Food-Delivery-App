import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../constants/apiUrl";

export const fetchMenuItems = async () => {
  const { data } = await axios.get(`${apiUrl}/api/menu/get`);
  return data;
};

export const useFetchMenuItemsQuery = () => {
  return useQuery<MenuItem[]>({
    queryKey: ["menu-items"],
    queryFn: () => fetchMenuItems(),
    staleTime: Infinity,
  });
};

// get meny items by category
export const fetchMenuItemsByCategory = async (category: string) => {
  const { data } = await axios.get(
    `${apiUrl}/api/menu/get-by-category/${category}`
  );
  return data;
};

export const useFetchMenuItemsByCategoryQuery = (category: string) => {
  return useQuery<MenuItem[]>({
    queryKey: ["menu-items-by-category", category],
    queryFn: () => fetchMenuItemsByCategory(category),
    staleTime: Infinity,
  });
};