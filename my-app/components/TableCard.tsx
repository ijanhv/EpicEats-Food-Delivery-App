import React, { useState } from "react";
import { View, Button } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/UserSlice";

const Card = ({
  status,
  seatNumber,
}: {
  status: string;
  seatNumber: number;
}) => {
  const [booked, setBooked] = useState<number[]>([]);
  const user = useSelector(selectUser);
  console.log(user);
  const handleBook = (seatNumber: number) => {
    if (booked.includes(seatNumber)) {
      setBooked(booked.filter((seat) => seat !== seatNumber));
      return;
    }
    setBooked([...booked, seatNumber]);
    console.log(booked);
  };


  const bookingData = {
    userId: user.userId,
    seatNumbers: booked,
    time: new Date().toISOString(),
  };

  console.log(bookingData);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 40,
        borderRadius: 5,
        margin: 3,
        cursor: "pointer",
      }}
      className={
        status === "booked"
          ? "bg-red-500"
          : booked.includes(seatNumber)
          ? "bg-red-400"
          : "bg-green-500"
      }
    >
      <Button
        title={seatNumber.toString()}
        onPress={() => handleBook(seatNumber)}
      />
    </View>
  );
};

export default Card;
