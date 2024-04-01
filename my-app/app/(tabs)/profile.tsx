import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/UserSlice";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "react-native-paper";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<User | null>(null);

  const user = useSelector(selectUser);
  console.log("user", user);

  console.log(student);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt_decode(token as string);
      setStudent(decodedToken as any);
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {/* <SafeAreaView className="flex-1 bg-white">
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/gradient-blue-background_52683-83535.jpg",
          }}
          className="w-full h-1/3 mb-3"
        />
        <View className="flex flex-row items-center justify-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
            }}
            className="h-32 w-32 rounded-full mb-5"
          />
        </View>
        {loading ? (
          <View className="flex flex-col items-center justify-center">
            <Text className="text-2xl font-bold">Loading...</Text>
          </View>
        ) : (
          <View className="flex flex-col items-center justify-center">
            <Text className="text-2xl font-bold">{student?.name}</Text>
            <Text className="text-xl">{student?.email}</Text>
            <Text className="text-xl">{student?.mobile}</Text>
          </View>
        )}
      </SafeAreaView> */}

<View className="space-y-6">
      <View className="flex flex-col items-center justify-center h-[320px] bg-[#567df4] rounded-b-3xl gap-y-3">
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
          }}
          className="h-20 w-20 rounded-full mb-5"
        />
        <Text className="text-2xl font-bold text-white">
          {user?.name}
        </Text>
        <View className="flex items-center gap-2 flex-row">
          <FontAwesome name="phone" size={24} color="white" />
          <Text className="  text-white text-lg mb-1">{user?.mobile}</Text>
        </View>
      </View>
      <View className="p-5">
        <Button
          // icon={() => <Feather name="log-out" size={24} color="black" />}
          mode="text"
          onPress={() => {
            AsyncStorage.removeItem('token');
            router.push('/login');
          }}
          className="border ">
          Sign Out
        </Button>
      </View>
    </View>
    </>
  );
};

export default ProfileScreen;
