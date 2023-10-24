import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetchMenuItems = async () => {
  const { data } = await axios.get(`https://epiceats-p99r.onrender.com/api/menu/get`);
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
    `http://localhost:8800/api/menu/get-by-category/${category}`
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