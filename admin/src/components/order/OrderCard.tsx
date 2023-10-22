import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useUpdateOrderStatus } from "@/hooks/useOrders";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  console.log(order);

  const { mutate, isLoading } = useUpdateOrderStatus();

  const handleUpdateOrderStatus = async (status: string) => {
    mutate({
      id: order?._id,
      status: status,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Order ID: {order?._id}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-xl font-bold">
          Customer: {order?.customer?.name}
        </div>
        <p className="text-xs text-muted-foreground">
          Status:{" "}
          <span
            className={`${
              order?.status === "received"
                ? "bg-blue-300"
                : order?.status === "preparing"
                ? "bg-orange-300"
                : order?.status === "completed"
                ? "bg-green-300"
                : ""
            }  text-black px-2 font-semibold inline-flex py-0.5 rounded-lg`}
          >
            {order?.status.toUpperCase()}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Total: {order?.total} INR
        </p>
        <p className="text-xs text-muted-foreground">
          Date: {order?.createdAtDate}
        </p>
        <p className="text-xs text-muted-foreground">
          Time: {order?.createdAtTime}
        </p>
        <div className="border border-gray-200 shadow-sm dark:border-gray-600 p-2 rounded-lg">
          <h3>Ordered Items:</h3>
          <ul>
            {order?.items?.map((item: any) => (
              <li key={item?._id} className="flex gap-4 items-center my-2">
                <Avatar>
                  <AvatarImage
                    src={item?.menuItem?.image}
                    alt="Avatar"
                    className="rounded-full"
                  />
                </Avatar>
                {item?.menuItem?.name} x {item?.quantity}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            handleUpdateOrderStatus(
              order?.status === "received"
                ? "preparing"
                : order?.status === "preparing"
                ? "completed"
                : "done"
            )
          }
        >
          {order?.status === "received"
            ? "Mark as Preparing"
            : order?.status === "preparing"
            ? "Mark as Completed"
            : "Remove Order"}{" "}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
