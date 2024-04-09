import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "@/lib/url";
import { toast } from "sonner";

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
  });
};

const getBookings = async () => {
  const res = await axios.get(`${apiUrl}/api/booking`);
  return res.data;
};

export const useFetchAllBookings = (): UseQueryResult<Booking[]> => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookings(),
    staleTime: Infinity,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};

const markAsVacant = async (seatNumber: number) => {
  const res = await axios.put(`${apiUrl}/api/seat/${seatNumber}/vacant`);
  return res.data;
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation(markAsVacant, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["seats"] });

      toast.success("Seat marked as vacant", {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#1A9768",
          color: "#fff",
        },
      });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
  });
};
