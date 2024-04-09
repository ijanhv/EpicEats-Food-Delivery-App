import React, { useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,

  Alert,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/UserSlice";
import axios from "axios";
import { apiUrl } from "../../constants/apiUrl";
import { router } from "expo-router";

const CallForUtensils = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const user = useSelector(selectUser);

  const handleLogin = () => {
    console.log(user);

    axios
      .post(`${apiUrl}/api/service/utensils`, {
        location,
        userId: user?.userId,
        serviceType,
      })
      .then((res) => {
        console.log(res.data);

        // router.push("/utensils");
        Alert.alert("Pick Up Utensils requested successfully");
        setLocation("");
        setServiceType("");
      })
      .catch((err) => {
        Alert.alert("Please try again");
        console.log(err);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">
              Call for Service
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>
        <View className="px-5 mt-32">
          <Text className="mt-4 px-4 text-2xl">
            Enter your location Ex - 414, 4th Floor
          </Text>
          <TextInput
            className="mt-5  bg-gray-100"
            placeholder="Enter your location"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          <TextInput
            className="mt-5  bg-gray-100"
            placeholder="What type of service do you need?"
            value={serviceType}
            onChangeText={(text) => setServiceType(text)}
          />

          <Button
            onPress={handleLogin}
            className="mt-10  border-2 border-purple-600 text-[#00CCBB] rounded-full "
          >
            Request
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CallForUtensils;
