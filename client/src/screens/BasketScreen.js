import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { XCircleIcon } from "react-native-heroicons/solid";

import {
  emptyBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../redux/features/BasketSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BasketScreen = () => {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    };

    fetchUser();
  }, []);

  const [groupedItemsInBusket, setGroupedItemsInBusket] = useState([]);

  const navigation = useNavigation();

  const items = useSelector(selectBasketItems);
  console.log("items", items);

  const basketTotal = useSelector(selectBasketTotal);

  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBusket(groupedItems);
  }, [items]);

  const orderData = {
    customer: user?.userId,
    items: [],
    total: 0,
  };

  for (const itemId in groupedItemsInBusket) {
    const items = groupedItemsInBusket[itemId];

    const firstItem = items[0];

    // Calculate the total for the current item
    const total = items.length * firstItem.price;

    orderData.items.push({
      menuItem: itemId,
      quantity: items.length,
    });

    orderData.total += total;
  }

  console.log("orderData", orderData);

  // post request to create order use axios
  const createOrder = async () => {
    try {
      await axios
        .post("http://localhost:8800/api/order/place-order", orderData)
        .then((res) => {
          console.log(res.data);
          Alert.alert("Order Placed Successfully");
          // empty the basket

          dispatch(emptyBasket());
        

          navigation.navigate("HomeScreen");

        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
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
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

       {items.length !== 0 && <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Preparing in 10-15 mins</Text>
        </View>}

        {
          items.length === 0 ? (
            <View className="flex-1  justify-center items-center">
              {/* <Image
                source={{
                  uri: "https://www.nicepng.com/png/full/242-2425647_empty-shopping-cart-png-empty-cart-png.png",
                }}
                className="h-96 w-80"
              /> */}
              <Text className="text-2xl my-10 mx-5 text-gray-500 font-bold text-center">
                Your cart is empty
              </Text>
            </View>
          ) : null
        }

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBusket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{
                  uri: items[0]?.imgUrl,
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.title}</Text>

              <Text className="text-gray-600">
                Rs {items[0]?.price * items.length}
                {/* <Currency quantity={items[0]?.price} currency="GBP" /> */}
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              {/* <Currency quantity={basketTotal} currency="GBP" /> */}
              Rs {basketTotal}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold text-xl">
              {/* <Currency quantity={basketTotal + 5.99} currency="INR" /> */}
              Rs {basketTotal}
            </Text>
          </View>

          <TouchableOpacity
          onPress={createOrder}
            // onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-xl font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
