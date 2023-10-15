import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/outline";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

//   useEffect(() => {
//     setTimeout(() => {
//       navigation.navigate("Delivery");
//     }, 2000);
//   }, []);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        // source={require("../../assets/preparing.gif")}
        source={{
            uri: "https://media3.giphy.com/media/yScQL8JL4mc6YJAfnm/giphy.gif"
        }}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-80"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-2xl my-10 mx-5 text-white font-bold text-center"
      >
        Wating for someone to accept your order
      </Animatable.Text>

      <Image
        source={{
          uri: "https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif",
        }}
        className="h-16 w-16"
      />

      {/* go back  */}
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-10 right-5"
            >
            <XCircleIcon color="white" size={50} />
        </TouchableOpacity>


    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
