"use client";
import { useFetchTodaysOrdersQuery } from "@/hooks/useOrders";
import OrderCard from "@/components/order/OrderCard";

export default function ReceivedOrders() {
  const { data, isLoading, isError, refetch } = useFetchTodaysOrdersQuery();
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  
  const receivedOrders = data.filter((order) => order.status === "received");
  const preparingOrders = data.filter((order) => order.status === "preparing");
  const completedOrders = data.filter((order) => order.status === "completed");

  return (
    <>
      <div className="flex-col md:flex mx-auto">
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 ">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Received Orders
              </h2>
              <div className="overflow-y-auto h-screen scrollbar scrollbar-w-0">
                {receivedOrders.map((order) => (
                  <div key={order._id} className="my-5 ">
                    <OrderCard order={order} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Preparing Orders
              </h2>
              <div className="overflow-y-auto h-screen scrollbar scrollbar-w-0">
                {preparingOrders.map((order) => (
                  <div key={order._id} className="my-5">
                    <OrderCard order={order} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Completed Orders
              </h2>
              <div className="overflow-y-auto h-screen scrollbar scrollbar-w-0">
                {completedOrders.map((order) => (
                  <div key={order._id} className="my-5">
                    <OrderCard order={order} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
