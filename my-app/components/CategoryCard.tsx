import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";

interface CategoryCardProps {
  imgUrl: string;
  title: string;
  color: string;
}

const CategoryCard = ({
  imgUrl = "https://links.papareact.com/gn7",
  title,
  color,
}: CategoryCardProps) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <View className={`h-20 w-20 rounded-lg ${color} `} />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
