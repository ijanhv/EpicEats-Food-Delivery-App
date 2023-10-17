import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const fetchOrders = async () => {
  const { data } = await axios.get(
    `http://localhost:8800/api/order/get-orders`
  );
  return data;
};

export const useFetchOrdersQuery = (): UseQueryResult<Order[]> => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
    staleTime: Infinity,
  });
};

const fetchTodaysOrders = async () => {
  const { data } = await axios.get(
    `http://localhost:8800/api/order/todays-orders`
  );
  return data;
};

export const useFetchTodaysOrdersQuery = (): UseQueryResult<Order[]> => {
  return useQuery({
    queryKey: ["todays-orders"],
    queryFn: () => fetchTodaysOrders(),
    staleTime: Infinity,
  });
};

// update order status

const updateOrderStatus = async (id: string, status: string) => {
  const { data } = await axios.patch(
    `http://localhost:8800/api/order/update-order/${id}`,
    { status }
  );
  return data;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: { id: string; status: string }) =>
      updateOrderStatus(data.id, data.status),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["todays-orders"] });
        toast({
          title: `Order status updated to ${data.status}`,
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: `Something went wrong please try later !!`,
          variant: "destructive",
        });
      },
    }
  );
};
