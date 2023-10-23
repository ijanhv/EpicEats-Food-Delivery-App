import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";

interface CategoryCardProps {
  imgUrl: string;
  title: string;
  color: string;
  link: string;
}

const CategoryCard = ({
  imgUrl = "https://links.papareact.com/gn7",
  title,
  color,
  link,
}: CategoryCardProps) => {
  return (
    <TouchableOpacity
      className="relative mr-2"
      onPress={() => router.push(link as any)}
    >
      <View className={`h-20 w-20 rounded-lg ${color} `} />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
