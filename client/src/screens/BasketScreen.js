import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";

  import { XCircleIcon } from "react-native-heroicons/solid";

import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../redux/features/BasketSlice";
  
  const BasketScreen = () => {
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
  
    console.log("groupedItems", groupedItems);
      setGroupedItemsInBusket(groupedItems);
    }, [items]);
  
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
  
          <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
            <Image
              source={{
                uri: "https://links.papareact.com/wru",
              }}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <Text className="flex-1">Preparing in 10-15 mins</Text>
   
          </View>
  
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
              onPress={() => navigation.navigate("PreparingOrderScreen")}
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