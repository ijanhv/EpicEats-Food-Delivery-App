import { useNavigation } from "expo-router";
import React from "react";

import { ArrowRightIcon, XCircleIcon } from "react-native-heroicons/solid";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useFetchRecommendationsQuery } from "../../hooks/useRecommendationsQuery";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/UserSlice";
import FeaturedRow from "../../components/FeaturedRow";
import FoodItemCard from "../../components/FoodItemCard";

const Recommendations = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const {
    data: menuItems,
    isPending,
    isError,
  } = useFetchRecommendationsQuery(user?.userId as string);
  if (isPending) return <Text>Loading...</Text>;
  if (isError)

    return (
      <SafeAreaView>
        <Text>Error</Text>
      </SafeAreaView>
    );
    console.log(menuItems);



  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
        <View>
          <Text className="text-lg font-bold text-center">Recommendations</Text>
        </View>
        <TouchableOpacity
          onPress={navigation.goBack}
          className="rounded-full bg-gray-100 absolute top-3 right-5"
        >
          <XCircleIcon color="#00CCBB" size={50} />
        </TouchableOpacity>

   
        {/* <FeaturedRow
            id="2"
            title="Recommended for you"
            description="Based on your previous orders, we think you might like these!"
            featuredCategory="featured"
            items={menuItems as MenuItem[]}
          /> */}
            <View>
    

    <View className="mt-4">
      <Text className=" text-lg text-gray-500 px-4 text-center">
        Based on your previous orders, we think you might like these!
        </Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4 mb-10"
      >

        {menuItems?.map((dish, i) => (
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
    </View>
      </View>
    </SafeAreaView>
  );
};

export default Recommendations;
