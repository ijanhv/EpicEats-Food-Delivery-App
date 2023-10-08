import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import FoodItemCard from "./FoodItemCard";

const FeaturedRow = ({ title, description, featuredCategory }) => {
  const sampleDishes = [
    {
      name: "Cheeseburger",
      description: "Classic cheeseburger with lettuce, tomato, and pickles.",
      price: 4.99,
      vegetarian: false,
      category: "Snacks",
      imgUrl:"https://freepngimg.com/thumb/burger/158711-cheese-burger-png-file-hd.png"

    },
    {
      name: "Vegetable Wrap",
      description:
        "Grilled vegetable wrap with hummus in a whole wheat tortilla.",
      price: 6.49,
      vegetarian: true,
        category: "Snacks",
        imgUrl: "https://www.cfacdn.com/img/order/menu/Online/Entrees/2022Veggie_Wrp_1080x1080.png"
    },
    {
      name: "Chicken Tenders",
      description:
        "Crispy chicken tenders served with your choice of dipping sauce.",
      price: 5.99,
      vegetarian: false,
        category: "Snacks",
        imgUrl:"https://belchicken.com/wp-content/uploads/2022/01/tenders-1.png"
    },
    {
      name: "Margherita Pizza",
      description:
        "Traditional margherita pizza with fresh tomatoes, mozzarella, and basil.",
      price: 8.99,
      vegetarian: true,
        category: "Lunch",
        imgUrl:"https://png.pngtree.com/png-clipart/20230412/original/pngtree-modern-kitchen-food-boxed-cheese-lunch-pizza-png-image_9048155.png"
    },
    {
      name: "Caesar Salad",
      description:
        "Caesar salad with romaine lettuce, croutons, and Caesar dressing.",
      price: 4.49,
      vegetarian: true,
        category: "Snacks",
        imgUrl:"https://www.pngitem.com/pimgs/m/4-41011_pizza-png-pizza-png-transparent-png.png"
    },
  ];

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
        {sampleDishes?.map((dish, i) => (
          <FoodItemCard
            key={i}
            // id={restaurant._id}
            imgUrl={dish.imgUrl}
            title={dish.name}
            category={dish.category}
            description={dish.description}
            rating={4.5}
            price={dish.price}
            
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
