import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import FoodItemCard from "./FoodItemCard";

interface FeaturedRowProps {
  id: string;
  title: string;
  description: string;
  featuredCategory: string;
  items: MenuItem[];
}


const FeaturedRow = ({id, title, description, featuredCategory, items }:  FeaturedRowProps ) => {

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon  />
      </View>
      <Text className=" text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {items?.map((dish, i) => (
          <FoodItemCard
            key={i}
            id={dish._id as string}
            imgUrl={dish.image as string}
            title={dish.name as string}
            category={dish.category as string}
            description={dish.description as string}
            price={dish.price as number}
            
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
