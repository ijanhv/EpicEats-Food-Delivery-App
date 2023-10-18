import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/UserSlice";
import { useMyOrders } from "../hooks/orders";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
    // useEffect(() => {
    //   setTimeout(() => {
    //     navigation.navigate("Delivery");
    //   }, 2000);
    // }, []);

    const user = useSelector(selectUser);

    const orders = useMyOrders({ id: user?.userId });


    // get the most recent order status

    const mostRecentOrder = orders[orders.length - 1];
    console.log("mostRecentOrder", mostRecentOrder);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
     <Animatable.Image
        // source={require("../../assets/preparing.gif")}
        source={{
          uri: "https://media3.giphy.com/media/yScQL8JL4mc6YJAfnm/giphy.gif",
        }}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-80"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-2xl my-10 mx-5 text-white font-bold text-center"
      >
        {/* {mostRecentOrder.status === "received" ? "Your order has been received!" : "Your order is being prepared!"} */}
        Your order is being prepared!
      </Animatable.Text>

      <Image
        source={{
          uri: "https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif",
        }}
        className="h-16 w-16"
      />

      {/* go back  */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-10 right-5"
      >
        <XCircleIcon color="white" size={50} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
