import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetchOrders = async () => {
  const { data } = await axios.get(`http://localhost:8800/api/order/get-orders`);
  return data;
};

export const useFetchOrdersQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
    staleTime: Infinity,
  });
};