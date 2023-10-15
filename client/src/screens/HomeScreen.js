import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


const HomeScreen = () => {
 const [user, setUser] = useState(null);
 console.log(user);

 
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    };

    fetchUser();
  }, []);


  return (
    <SafeAreaView>
      {/* HEADER */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Welcome!</Text>
          <Text className="font-bold text-lg">
            {user ? user.name : "Guest"}
            <Text className="font-bold text-lg text-green-500"> 👋</Text> 

            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <TouchableOpacity>
          <UserIcon size={35} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      {/* HEADER */}

      {/*Search*/}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row flex-1 space-x-2  bg-gray-200 p-3 shadow-xs rounded-lg">
          <MagnifyingGlassIcon size={20} color="#00CCBB" />
          <TextInput
            placeholder="Search"
            className="flex-1 bg-transparent outline-none"
          />
        </View>
        <AdjustmentsVerticalIcon size={25} color="#00CCBB" />
      </View>
      {/* Search */}

      {/* BODY */}
      <ScrollView
        className="bg-gray-100 "
        contentContainerStyle={{
          paddingBottom: 130,
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
        />
        <FeaturedRow
          id="2"
          title="Featured"
          description="Must try dishes"
          featuredCategory="featured"
        />
        <FeaturedRow
          id="3"
          title="Featured"
          description="Must try dishes"
          featuredCategory="featured"
        />
        {/* Featured */}
      </ScrollView>
  
      {/* BODY */}
    </SafeAreaView>
  );
};

export default HomeScreen;
