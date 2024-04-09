"use client"
import React from "react";
import Card from "./Card";
import { useFetchAllBookings, useFetchAllSeats } from "@/hooks/useBooking";
import Loader from "../loading/Loader";

const SEATS_PER_TABLE = 6;

const Bookings = () => {
const { isLoading, isError, data } = useFetchAllSeats();
const {data: booking, isLoading: isBookingLoading, isError: isBookingError} = useFetchAllBookings()


if (isLoading || isBookingLoading) return <Loader />;
if (isError || isBookingError) return <div>Something went wrong</div>;

// Group the seats into tables
const tables: any[][] = data.reduce((acc: any[][], seat, index) => {
    const tableIndex = Math.floor(index / SEATS_PER_TABLE);
    if (!acc[tableIndex]) {
        acc[tableIndex] = [] as any[];
    }
    acc[tableIndex].push(seat);
    return acc;
}, []);

  return (
    <div className="flex flex-wrap gap-10">
      {tables.map((table, tableIndex) => (
        <div key={tableIndex} className="table">
          <h2 className="mb-4">Table {tableIndex + 1}</h2>
          <div className="grid grid-cols-3 gap-4">
            {table.map((seat) => (

              <Card key={seat._id} status={seat.status} seatNumber={seat.seatNumber} />
            ))}
          </div>
        </div>
      ))}

<div className="mt-8 w-full">
        <h2 className="text-2xl font-semibold mb-4">Bookings Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-4">
        {booking.map((bookingItem, index) => (
          <div key={index} className="bg-foreground/10 shadow-md rounded p-4 mb-4 ">
            <p className="text-lg font-semibold mb-2">User: {bookingItem.user.name}</p>
            <p className="text-sm mb-2">Time: {new Date(bookingItem.time).toLocaleString()}</p>
            <p className="text-sm mb-2 capitalize">Status: {bookingItem.status}</p>
            <p className="text-sm">Seats Booked: {bookingItem.seats.map((seat) => seat.seatNumber).join(", ")}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
