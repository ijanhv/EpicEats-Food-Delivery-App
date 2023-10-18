import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiUrl } from "../lib/apiUrl";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const user = { name, email, password, mobile };

    // sent a POST request to /api/user/register
    axios
      .post(`http:localhost:8800/api/user/register`, user)
      .then((res) => {
        console.log(res.data);
        Alert.alert("Registration successful");
        navigation.navigate("Login");
        setEmail("");
        setPassword("");
        setName("");
        setMobile("");
      })
      .catch((err) => {
        Alert.alert("Registration failed");
        console.log(err)
      });


  }

  return (
    <SafeAreaView className="bg-white">
      <View className="bg-blue-900 h-1/2">
        <Image
          className="w-full h-full"
          source={{
            uri: "https://img.freepik.com/free-vector/gradient-blue-background_52683-83535.jpg",
          }}
        />
        <Text className="text-white text-3xl w-full text-center font-bold absolute top-1/3  transform -translate-x-1/2 -translate-y-1/2">
          Welcome to EpicEats! 😋
        </Text>
      </View>
      <View className=" h-1/2 bg-white rounded-2xl mt-[-150] mb-[200] ">
        <View className="justify-center px-10 ">
          <Text className="text-center text-2xl font-bold pt-8">
            Sign Up Now
          </Text>

          <TextInput
            className="mt-5 p-4 border border-gray-200 rounded-full bg-gray-100"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            className="mt-5 p-4 border border-gray-200 rounded-full bg-gray-100"
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            className="mt-5 p-4 border border-gray-200 rounded-full bg-gray-100"
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
          <TextInput
            className="mt-5 p-4 border border-gray-200 rounded-full bg-gray-100"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <View className="flex flex-col justify-between mt-8">
            <Text 
            onPress={() => navigation.navigate("Login")}
            className="text-gray-500">Already have an account?</Text>
          </View>
          <TouchableOpacity
          onPress={handleRegister}
          className="bg-blue-800 w-full rounded-full px-3 py-2 my-5 justify-center ">
            <Text className="text-white font-bold text-center text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
