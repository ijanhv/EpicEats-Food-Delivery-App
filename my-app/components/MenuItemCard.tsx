// MenuItemCard.tsx
import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../redux/features/BasketSlice";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const MenuItemCard = ({ item }: any) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const items = useSelector((state: any) =>
    selectBasketItemsWithId(state, item._id)
  );

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        id: item._id,
        title: item.name,
        description: item.description,
        price: item.price,
        imgUrl: item.image,
      })
    );
  };

  const removeItemFromBasket = () => {
    if (items.length > 0) return;

    dispatch(removeFromBasket({ id: item._id }));
  };
  return (
    <View
      className="flex flex-row items-center justify-between bg-white rounded-lg border-b border-gray-200 py-3 px-5 my-2 "
      key={item._id}
    >
      <View className="flex flex-row items-center gap-4 ">
        <Image
          source={{ uri: item.image }}
          className="h-24 w-24 object-cover"
        />
        <View>
          <Text className="font-bold">{item.name}</Text>
          <Text className="text-gray-500 w-44 text-xs flex-wrap">
            {item.description}
          </Text>
          {item?.tags?.map((tag: string) => (
            <Text className="text-[10px] font-semibold  text-blue-800">
              {" "}
              {tag}
            </Text>
          ))}
          {!isPressed ? (
            <TouchableOpacity
              onPress={() => setIsPressed(!isPressed)}
              className="bg-[#1a4396] w-[70%] mt-2 rounded-lg px-3 py-1 justify-center"
            >
              <Text className="text-white font-bold text-center ">
                Add to cart
              </Text>
            </TouchableOpacity>
          ) : (
            // plus minus buttons

            <View className=" px-4">
              <View className="flex-row items-center space-x-2 pb-3">
                <TouchableOpacity
                  disabled={!items.length}
                  onPress={removeItemFromBasket}
                >
                  <MinusCircleIcon size={30} color="blue" />
                </TouchableOpacity>
                <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemToBasket}>
                  <PlusCircleIcon size={30} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
      <Text className="font-bold text-xl">₹ {item.price}</Text>
    </View>
  );
};

export default MenuItemCard;
