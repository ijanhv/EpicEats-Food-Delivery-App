import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMyOrders } from "../hooks/orders";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/UserSlice";


const MyOrdersScreen = () => {
  // const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     const decodedToken = jwt_decode(token);
  //     setUser(decodedToken);
  //   };

  //   fetchUser();
  // }, []);
  const user = useSelector(selectUser);

  const orders = useMyOrders({ id: user?.userId });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">
              My Previous Orders
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {orders && orders?.map((order) => (
            <View key={order._id} className="bg-white p-4">
              <Text className="text-md font-semibold mb-2">
                Order ID: {order._id}
              </Text>
              <Text className="text-sm text-gray-500">
                Date: {new Date(order.createdAt).toDateString()}
              </Text>

              {order.items.map(
                (item) => (
                  console.log(item),
                  (
                    <>
                      <View
                        key={item.menuItem._id}
                        className="flex-row items-center space-x-3 my-2 "
                      >
                        <Text className="text-[#00CCBB]">
                          {item.quantity} x
                        </Text>
                        <Image
                          source={{ uri: item.menuItem.image }}
                          className="h-12 w-12 rounded-full"
                        />
                        <Text className="flex-1">{item.menuItem.name}</Text>
                        <Text className="text-gray-600">
                          Rs {item.menuItem.price * item.quantity}
                        </Text>
                      </View>
              
                    </>
                  )
                )
              )}

              <Text className="text-xl font-semibold mt-2">
                Total: Rs {order.total}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyOrdersScreen;
