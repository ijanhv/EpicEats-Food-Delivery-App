import React from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
<SafeAreaView>      
    <View className="bg-blue-900 h-1/2">
        <Image
          className="w-full h-full"
          source={{
            uri: "https://img.freepik.com/free-vector/gradient-blue-background_52683-83535.jpg",
          }}
        />
        <Text className="text-white text-4xl  w-full text-center font-bold absolute top-1/2  transform -translate-x-1/2 -translate-y-1/2">
          Welcome Back
        </Text>
      </View>
      <View className="bg-white h-1/2 rounded-2xl mt-[-100] mb-[230]">
        <View className="justify-center px-10">
          <Text className="text-center text-3xl font-bold pt-8">Sign In</Text>

          <TextInput
            className="mt-5 p-4 border border-gray-200 rounded-full bg-gray-100"
            placeholder="Email"
          />
          <TextInput
            className="mt-5 p-4 border border-gray-200 rounded-full bg-gray-100"
            placeholder="Password"
            secureTextEntry
          />

          <View className="flex flex-col justify-between mt-8">
            <Text className="text-gray-500">Don't have an account?</Text>
          </View>
          <TouchableOpacity className="bg-blue-800 w-full rounded-full px-3 py-2 my-5 justify-center">
            <Text className="text-white font-bold text-center text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </View>

</SafeAreaView>
  );
};

export default LoginScreen;
