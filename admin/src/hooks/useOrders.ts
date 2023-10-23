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
    // refetchOnWindowFocus: true,
    // refetchInterval: 2000,
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

// get total orders

const getDashboardDetails = async () => {
  const { data } = await axios.get(
    `http://localhost:8800/api/order/dashboard`
  );
  return data;
};

// total number of orders

export const useGetDashboardDetails = (): UseQueryResult<DashboardDetails> => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardDetails(),
    staleTime: Infinity,
  });
};


// get revenue by day 

const getRevenueByDay = async () => {
  const { data } = await axios.get(
    `http://localhost:8800/api/order/revenue-by-day`
  );
  return data;
};

export const useGetRevenueByDay = (): UseQueryResult<RevenueByDay> => {
  return useQuery({
    queryKey: ["revenue-by-day"],
    queryFn: () => getRevenueByDay(),
    staleTime: Infinity,
  });
}

// get revenue by month


const getRevenueByMonth = async () => {
  const { data } = await axios.get(
    `http://localhost:8800/api/order/revenue-by-month`
  );
  return data;
};

export const useGetRevenueByMonth = (): UseQueryResult<RevenueByMonth> => {
  return useQuery({
    queryKey: ["revenue-by-month"],
    queryFn: () => getRevenueByMonth(),
    staleTime: Infinity,
  });
}