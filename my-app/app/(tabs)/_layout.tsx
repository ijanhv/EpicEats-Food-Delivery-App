import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";


import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useSelector(selectUser);

  
 
  return (
    <Tabs>
 
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cart-arrow-down" color={color} />
          ),
          headerShown: false,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
        <Tabs.Screen
        name="recommendations"
        options={{
          title: "Recomendations",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="star" color={color} />
          ),
          headerShown: false,
          
        }}
      />

      
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-circle" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "My Orders",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="address-book" color={color} />
          ),
          headerShown: false,
        }}
      />
 
  <Tabs.Screen
    name="utensils"
    options={{
      title: "Service",
      href: user?.role === "student" ? null : "/utensils",
      tabBarIcon: ({ color }) => (
        <TabBarIcon name="spoon" color={color} />
      ),
      headerShown: false,
    }}
  />

    </Tabs>
  );
}
