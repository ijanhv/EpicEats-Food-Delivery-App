import { useUpdateBooking } from "@/hooks/useBooking";
import React from "react";

import { MdTableRestaurant } from "react-icons/md";

const Card = ({
  status,
  seatNumber,
}: {
  status: string;
  seatNumber: number;
}) => {
    const { mutate } = useUpdateBooking();

    
  return (
    <div>
      <div
      onClick={() => mutate(seatNumber)}
        className={`flex flex-col items-center justify-center w-16 h-16 cursor-pointer
        ${
          status === "booked"
            ? "bg-red-100 text-red-500"
            : "bg-green-200 text-green-500"
        }
        rounded-full`}
      >
        <MdTableRestaurant size={24} />
        <span className="text-sm">{seatNumber}</span>
      </div>
    </div>
  );
};

export default Card;
