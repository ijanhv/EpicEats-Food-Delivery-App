import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchMenuItemsByCategoryQuery } from "../../../hooks/useMenuItemQuery";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from "../../../redux/features/BasketSlice";
import MenuItemCard from "../../../components/MenuItemCard";

export default function Page() {
  const { slug } = useLocalSearchParams();

  const {
    data: menuItems,
    isPending,
    isError,
  } = useFetchMenuItemsByCategoryQuery(slug as string);

  if (isPending) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;





  return (
    <SafeAreaView>
      <View className="flex flex-col px-5">
        <Text className="text-2xl font-bold text-center ">
          {slug.toString().toUpperCase()}
        </Text>


     
          {menuItems?.map((item) => (
            <MenuItemCard
              key={item._id}
              item={item}
  
            />
          ))}

      </View>
    </SafeAreaView>
  );
}
