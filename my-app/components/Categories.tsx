import { View, Text, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const items = [
    {
      _id: 1,
      name: "Breakfast",
      image: "https://links.papareact.com/ikj",
      color: "bg-[#f59e0b]",
      link: "/category/breakfast",
    },
    {
      _id: 2,
      name: "Lunch",
      image: "https://links.papareact.com/3pn",
      color: "bg-[#10b981]",
      link: "/category/lunch",
    },
    {
      _id: 3,
      name: "Snacks",
      image: "https://links.papareact.com/28w",
      color: "bg-[#f472b6]",
      link: "/category/snacks",
    },

    {
      _id: 5,
      name: "Drinks",
      image: "https://links.papareact.com/2fm",
      color: "bg-[#ec4899]",
      link: "/category/drinks",
    },
  ];
  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {items.map((category) => (
        <CategoryCard
          key={category._id}
          title={category.name}
          color={category.color}
          imgUrl={category.image}
          link={category.link}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
