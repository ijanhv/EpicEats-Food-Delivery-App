import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchMenuItemsByCategoryQuery } from "../../../hooks/useMenuItemQuery";

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
        <Text className="text-2xl font-bold text-center mt-10">
          {slug.toString().toUpperCase()}
        </Text>

        {menuItems?.map((item) => (
          <View
            className="flex flex-row items-center justify-between bg-white rounded-lg border-b border-gray-200 py-3 px-5 my-2 "
            key={item._id}
          >
            <View className="flex flex-row items-center gap-4 ">
              <Image
                source={{ uri: item.image }}
                className="h-20 w-20 rounded-full"
              />
              <View>
                <Text className="font-bold">{item.name}</Text>
                <Text className="text-gray-500 w-44 text-xs flex-wrap">
                  {item.description}
                </Text>
                {item?.tags?.map((tag) => (
                  <Text className="text-[10px] font-semibold  text-blue-800">
                    {" "}
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
            <Text className="font-bold text-xl">₹ {item.price}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
