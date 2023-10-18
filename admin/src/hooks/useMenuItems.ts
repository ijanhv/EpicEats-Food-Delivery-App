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

const createMenuItem = async ({
  name,
  category,
  description,
  image,
  quantity,
  featured,
  tags,
  price,
}: MenuItem) => {
  const { data } = await axios.post(
    `http://localhost:8800/api/menu/menuItem/create`,
    {
      name,
      category,
      description,
      image,
      quantity,
      featured,
      tags,
      price,
    }
  );
  return data;
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(createMenuItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      toast({
        title: `${data.name} created successfully`,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: `Something went wrong please try later !!`,
        variant: "destructive",
      });
    },
  });
};

// update menu item /menuItem/update/:id

const updateMenuItem = async ({
  _id,
  name,
  category,
  description,
  image,
  quantity,
  featured,
  tags,
  price,
}: MenuItem) => {
  const { data } = await axios.put(
    `http://localhost:8800/api/menu/menu-item/update/${_id}`,
    {
      
      name,
      category,
      description,
      image,
      quantity,
      featured,
      tags,
      price,
    }
  );
  return data;
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMenuItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      toast({
        title: `${data.name} updated successfully`,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: `Something went wrong please try later !!`,
        variant: "destructive",
      });
    },
  });
};
