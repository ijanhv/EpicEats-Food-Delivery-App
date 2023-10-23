import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchOrders = async ({ id }: { id: string }) => {
 
  const { data } = await axios.get(
    `http:localhost:8800/api/order/get-customer-orders/${id}`
  );
  return data;
};

export const useFetchOrdersQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["orders"],
    refetchInterval: 4000,
    queryFn: () => fetchOrders({ id: id }),
    staleTime: Infinity,
  });
};

const createOrder = async (orderData: Order) => {
  const response = await axios.post(
    "http://localhost:8800/api/order/place-order",
    orderData
  );
  return response.data;
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
