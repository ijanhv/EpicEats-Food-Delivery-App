import { Image } from "react-native";
import { Text, View } from "../../components/Themed";
import { useFetchMenuItemsQuery } from "../../hooks/useMenuItemQuery";
import BasketIcon from "../../components/BasketIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Categories from "../../components/Categories";
import FeaturedRow from "../../components/FeaturedRow";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { setUser } from "../../redux/features/UserSlice";

export default function TabOneScreen() {
  const { data: menuItems, isPending, isError } = useFetchMenuItemsQuery();

  const [userData, setUserData] = useState<User | null>(null);
  console.log(userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt_decode(token as string);
      setUserData(decodedToken as any);
      dispatch(setUser(decodedToken));
    };

    fetchUser();
  }, []);

  const todaySpecial = menuItems?.filter((item: any) =>
    item.tags.includes("todays-special")
  );
  const popularItems = menuItems?.filter((item: any) =>
    item.tags.includes("popular")
  );
  const featuredItems = menuItems?.filter((item) => item.featured);


  if (isPending) return <Text>Loading...</Text>;
  if (isError)
    return (
      <SafeAreaView>
        <Text>Error</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-gray-100">
      <BasketIcon />
      {/* <SafeAreaView> */}
        {/* HEADER */}

        <View className="flex-row pb-3 items-center mx-4 space-x-2 bg-gray-100">
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/1365713/screenshots/5381232/foodiction.png",
            }}
            className="h-7 w-7  p-4 rounded-full"
          />
          <View className="flex-1 bg-gray-100">
            <Text className="font-bold text-gray-400 text-xs">Welcome!</Text>
            <Text className="font-bold text-lg text-black">
              {userData ? userData.name : "Guest"}
              <Text className="font-bold text-lg text-green-500"> 👋</Text>

              <ChevronDownIcon size={20} />
            </Text>
          </View>
          <TouchableOpacity>
            <UserIcon size={35} />
          </TouchableOpacity>
        </View>
        {/* HEADER */}

        {/*Search*/}
        <View className="flex-row items-center space-x-2 pb-2 mx-4 bg-gray-100">
          <View className="flex-row flex-1 space-x-2  bg-gray-200 p-3 shadow-xs rounded-lg">
            <MagnifyingGlassIcon size={20} />
            <TextInput
              placeholder="Search"
              className="flex-1 bg-transparent outline-none"
            />
          </View>
          <AdjustmentsVerticalIcon size={25} />
        </View>
        {/* Search */}

        {/* BODY */}
        <ScrollView
          className=" "
          contentContainerStyle={{
            paddingBottom: 170,
          }}
        >
          {/* Categories */}
          <Categories />
          {/* Categories */}

          {/* Featured */}
          <FeaturedRow
            id="1"
            title="Today's Specials"
            description="Must try dishes"
            featuredCategory="featured"
            items={todaySpecial as MenuItem[]}
          />
          <FeaturedRow
            id="2"
            title="Popular"
            description="Some of our best sellers"
            featuredCategory="featured"
            items={popularItems as MenuItem[]}
          />
          <FeaturedRow
            id="3"
            title="Featured"
            description="Must try dishes"
            featuredCategory="featured"
            items={featuredItems as MenuItem[]}
          />
          {/* Featured */}
        </ScrollView>

        {/* BODY */}
      {/* </SafeAreaView> */}
    </SafeAreaView>
  );
}
