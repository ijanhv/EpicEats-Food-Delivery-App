import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import FoodItemCard from "./FoodItemCard";
import { useMenuItems } from "../hooks/menuItems";

const FeaturedRow = ({ title, description, featuredCategory }) => {
  const menuItems = useMenuItems();



  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={"#00CCBB"} />
      </View>
      <Text className=" text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {menuItems?.map((dish, i) => (
          <FoodItemCard
            key={i}
            id={dish._id}
            imgUrl={dish.image}
            title={dish.name}
            category={dish.category}
            description={dish.description}
     
            price={dish.price}
            
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
