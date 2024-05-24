import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "../constants/apiUrl";
import { Alert } from "react-native";

const getAllSeats = async () => {
  const { data } = await axios.get(`${apiUrl}/api/seat`);
  return data;
};

export const useFetchAllSeats = (): UseQueryResult<Seat[]> => {
  return useQuery({
    queryKey: ["seats"],
    queryFn: () => getAllSeats(),
    staleTime: Infinity,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchInterval: 3000,
  });
};
// /patil.janhavi1207@gmail.com

const createBooking = async (bookingData: {
  userId: string;
  seatNumbers: number[];
  time: string;
}) => {
  const { data } = await axios.post(`${apiUrl}/api/booking`, bookingData);
  console.log(data);
  return data;
};

export const useCreatBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["seats"] });
      Alert.alert("Seats Booked successfully!");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};


