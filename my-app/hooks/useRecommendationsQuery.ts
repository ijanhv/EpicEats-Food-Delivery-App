import axios from "axios";
import { apiUrl } from "../constants/apiUrl";
import { useQuery } from "@tanstack/react-query";

export const fetchRecommendations = async (userId: string) => {
    const { data } = await axios.get(`${apiUrl}/api/recommendation/get/${userId}`);
    console.log(data);
    return data;

  };
  
export const useFetchRecommendationsQuery = (userId: string) => {
    return useQuery<MenuItem[]>({
        queryKey: ["user-recommendations", userId],
        queryFn: () => fetchRecommendations(userId),
        staleTime: Infinity,
        refetchOnMount: "always",
        refetchOnWindowFocus: "always",
        refetchInterval: 10000,

    });
};
  