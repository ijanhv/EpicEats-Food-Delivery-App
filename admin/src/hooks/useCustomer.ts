import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
  } from "@tanstack/react-query";
  import axios from "axios";
  import { toast } from "@/components/ui/use-toast";
  import { apiUrl } from "@/lib/url";
  
  const fetchCustomers = async () => {
    const { data } = await axios.get(`${apiUrl}/api/user/get-all-users`);
    return data;
  };
  
  export const useFetchCustomersQuery = (): UseQueryResult<Customer[]> => {
    return useQuery({
      queryKey: ["customers"],
      queryFn: () => fetchCustomers(),
      staleTime: Infinity,
    });
  };