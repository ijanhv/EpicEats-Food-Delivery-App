// api/service/get/utensils/today

import { apiUrl } from "@/lib/url";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const getServices = async () => {
    const res = await axios.get(`${apiUrl}/api/service/get/utensils/today`);
    console.log(res.data);
    return res.data;
  };
  
  export const useFetchAllServices = ()=> {
    return useQuery({
      queryKey: ["service"],
      queryFn: () => getServices(),
      staleTime: Infinity,
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
    });
  };