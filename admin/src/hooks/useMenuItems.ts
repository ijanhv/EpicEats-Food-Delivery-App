import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const fetchMenuItems = async () => {
  const { data } = await axios.get(`http://localhost:8800/api/menu/get`);
  return data;
};

export const useFetchMenuItemsQuery = (): UseQueryResult<MenuItem[]> => {
  return useQuery({
    queryKey: ["menu-items"],
    queryFn: () => fetchMenuItems(),
    staleTime: Infinity,
  });
};
