import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../redux/features/BasketSlice";

const FoodItemCard = ({
  id,
  imgUrl,
  title,
  rating,
  category,
  description,
  price,
  vegetarian,
}) => {

  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) => selectBasketItemsWithId(state, id));


  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, title, description, price, imgUrl }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  return (
    <TouchableOpacity
      // onPress={() => {
      //   navigation.navigate("Restaurant", {
      //     id,
      //     imgUrl,
      //     title,
      //     rating,
      //     category,
      //     description,
      //     price,
      //     vegetarian,
      //   });
      // }}
      className="bg-white mr-3 shadow w-64 rounded-lg"
    >
      <Image
        source={{ uri: imgUrl }}
        className="h-36 w-64 rounded-sm bg-white justify-center"
      />

      <View className="px-3 pb-3 pt-3 bg-white rounded-b-lg">
        <View className="justify-between flex flex-row items-center">
          <Text className="font-bold text-lg ">{title}</Text>
        </View>

        <View className="text-xs rounded-full my-1 ">
          <Text className="text-xs font-semibold ">{category}</Text>
        </View>

        <Text className="text-xs text-gray-500 my-1 max-h-10">
          {description}
        </Text>
        <View className="flex flex-row w-full justify-between mt-2">
          <View className="flex-row items-center space-x-1">
            <Text className="text-lg text-gray-700 font-bold">Rs {price}</Text>
          </View>

          {!isPressed ? (
            <TouchableOpacity
              onPress={() => setIsPressed(!isPressed)}
              className="bg-[#1a4396] w-1/2 rounded-lg px-3 py-1 justify-center"
            >
              <Text className="text-white font-bold text-center ">
                Add to cart
              </Text>
            </TouchableOpacity>
          ) : (
            // plus minus buttons

            <View className="bg-white px-4">
              <View className="flex-row items-center space-x-2 pb-3">
                <TouchableOpacity
                  disabled={!items.length}
                  onPress={removeItemFromBasket}
                
                >
                  <MinusCircleIcon 
                  color={!items.length ? "gray" : "#1a4396"}
                size={30} />
                </TouchableOpacity>
                <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemToBasket}>
                  <PlusCircleIcon color="#1a4396" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodItemCard;
