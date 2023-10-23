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
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { XCircleIcon } from "react-native-heroicons/solid";

import {
  emptyBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../../redux/features/BasketSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateOrderMutation } from "../../hooks/useOrdersQuery";
import { isLoading } from "expo-font";
import { router } from "expo-router";

// {"description": "Crispy rice crepe served with various chutneys and sambar.", "id": "652badee1c0e88d88c08bf31", "imgUrl": "https://i.pinimg.com/originals/e8/48/ca/e848ca06cc72cfb473c1d96f2ea75183.png", "price": 55, "title": "Dosa"}, {"description": "Crispy rice crepe served with various chutneys and sambar.", "id": "652badee1c0e88d88c08bf31", "imgUrl": "https://i.pinimg.com/originals/e8/48/ca/e848ca06cc72cfb473c1d96f2ea75183.png", "price": 55, "title": "Dosa"}]
interface CartItem {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
}

const Cart = () => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt_decode(token as string);
      setUser(decodedToken as any);
    };
    fetchUser();
  }, []);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState<{
    [key: string]: number;
  }>({});
  const [itemDetails, setItemDetails] = useState<{
    [key: string]: {
      id: string;
      quantity: number;
      title: string;
      price: number;
      imgUrl: string;
    };
  }>({});


  const navigation = useNavigation();

  const items: CartItem[] = useSelector(selectBasketItems);


  const basketTotal = useSelector(selectBasketTotal);

  const dispatch = useDispatch();

  const calculateItemQuantity = () => {
    const newGroupedItemsInBasket: { [key: string]: number } = {};
    const newItemDetails: {
      [key: string]: {
        id: string;
        quantity: number;
        title: string;
        price: number;
        imgUrl: string;
      };
    } = {};

    items.forEach((item: CartItem) => {
      if (item.id) {
        const itemId = item.id;
        if (!newGroupedItemsInBasket[itemId]) {
          newGroupedItemsInBasket[itemId] = 1;
          newItemDetails[itemId] = {
            id: itemId,
            quantity: 1,
            title: item.title,
            imgUrl: item.imgUrl,
            price: item.price,
          };
        } else {
          newGroupedItemsInBasket[itemId]++;
          newItemDetails[itemId].quantity++;
        }
      }
    });

    setGroupedItemsInBasket(newGroupedItemsInBasket);
    setItemDetails(newItemDetails);
  };

  useEffect(() => {
    calculateItemQuantity();
  }, [items]);



  const orderData: {
    customer: string;
    items: Array<{ menuItem: string; quantity: number }>;
    total: number;
  } = {
    customer: user?.userId || "",
    items: [],
    total: 0,
  };


   orderData.items = Object.keys(itemDetails).map((key) => ({
    menuItem: key,
    quantity: itemDetails[key].quantity,
    // subtotal

  }));

  orderData.total = basketTotal;



  const { mutate: placeOrder, isPending, isSuccess } = useCreateOrderMutation();

  const createOrder = () => {
    try {
      const res = placeOrder(orderData as any);
      console.log(res);
      Alert.alert("Order Placed Successfully");
      router.push("/");
      dispatch(emptyBasket());
    } catch (error) {
      console.log(error);
    }
  };
 



  // post request to create order use axios
  // const createOrder = async () => {
  //   try {
  //     await axios
  //       .post("http://localhost:8800/api/order/place-order", orderData)
  //       .then((res) => {
  //         console.log(res.data);
  //         Alert.alert("Order Placed Successfully");
  //         // empty the basket
  //         dispatch(emptyBasket());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

        {items.length !== 0 && (
          <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
            <Image
              source={{
                uri: "https://links.papareact.com/wru",
              }}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <Text className="flex-1">Preparing in 10-15 mins</Text>
          </View>
        )}

        {items.length === 0 ? (
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
        ) : null}

        <ScrollView className="divide-y divide-gray-200">
          {Object.keys(itemDetails).map((key) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">
                {itemDetails[key].quantity} x
              </Text>
              <Image
                source={{
                  uri: itemDetails[key].imgUrl,
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{itemDetails[key].title}</Text>

              <Text className="text-gray-600">
                Rs {itemDetails[key].price * itemDetails[key].quantity}
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

export default Cart;
