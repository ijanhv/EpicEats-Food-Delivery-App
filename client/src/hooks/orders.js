import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export const useMyOrders = ({ id }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getMyOrders = async () => {
      console.log("id", id);
      try {
        const response = await axios.get(
          `http:localhost:8800/api/order/get-customer-orders/${id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.log("error getting menu items", error);
      }
    };
    getMyOrders();
  }, []);

  return orders;
};

// const fetchOrders = async () => {
//   const { data } = await axios.get(
//     `http:localhost:8800/api/order/get-customer-orders/${id}`
//   );
//   return data;
// };

// export const useFetchOrdersQuery = useQuery({
//   queryKey: ["my-orders"],
//   queryFn: () => fetchOrders(),
//   staleTime: Infinity,
// });
