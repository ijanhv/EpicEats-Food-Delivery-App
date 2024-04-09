import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useCreatBooking, useFetchAllSeats } from "../../hooks/useBookingsQuery";
import Card from "../../components/TableCard";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/UserSlice";
import { Button } from "react-native-paper";

const BookingsScreen = () => {
  const SEATS_PER_TABLE = 6;
  const [booked, setBooked] = useState<number[]>([]);
  const navigation = useNavigation();
  const { data, isPending, isError } = useFetchAllSeats();
  const { mutate } = useCreatBooking();
  const user = useSelector(selectUser);

  if (isPending) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;
  const tables: any[][] = data.reduce((acc: any[][], seat, index) => {
    const tableIndex = Math.floor(index / SEATS_PER_TABLE);
    if (!acc[tableIndex]) {
      acc[tableIndex] = [] as any[];
    }
    acc[tableIndex].push(seat);
    return acc;
  }, []);





  const handleBook = (seatNumber: number) => {
    if (booked.includes(seatNumber)) {
      setBooked(booked.filter((seat) => seat !== seatNumber));
      return;
    }
    setBooked([...booked, seatNumber]);

  };


  const bookingData = {
    userId: user.userId,
    seatNumbers: booked,
    time: new Date().toISOString(),
  };



  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Cart Items</Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon size={50} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {tables.map((table, tableIndex) => (
            <View key={tableIndex} style={styles.tableContainer}>
              <Text style={styles.tableHeaderText}>Table {tableIndex + 1}</Text>
              <View style={styles.seatContainer}>
                {table.map((seat, index) => (
                      <View
                        key={seat.seatNumber}
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
                        seat.status === "booked"
                          ? "bg-red-500"
                          : booked.includes(seat.seatNumber)
                          ? "bg-red-400"
                          : "bg-green-500"
                      }
                    >
                      <Button
                        // @ts-ignore
                        title={index.toString()}
                        onPress={() => handleBook(seat.seatNumber)}
                      />
                    </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        {booked.length > 0 && (
          <TouchableOpacity style={styles.floatingButton} onPress={
            () => {
                // @ts-ignore
              mutate(bookingData);
              setBooked([]);
            
            }
            }>
            <Text style={styles.floatingButtonText}>Create Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#00CCBB",
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  tableContainer: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  tableHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  seatContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  floatingButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default BookingsScreen;
