import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
  } from "@tanstack/react-query";
  import axios from "axios";
  import { toast } from "@/components/ui/use-toast";
  
  const fetchOrders = async () => {
    const { data } = await axios.get(`http://localhost:8800/api/order/get-orders`);
    return data;
  };
  
  export const useFetchOrdersQuery = (): UseQueryResult<Order[]> => {
    return useQuery({
      queryKey: ["orders"],
      queryFn: () => fetchOrders(),
      staleTime: Infinity,
    });
  };
  