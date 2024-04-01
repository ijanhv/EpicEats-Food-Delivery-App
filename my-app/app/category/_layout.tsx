import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function CategoryLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#00CCBB",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: {
            pathname: "/",
          },
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />

     
      <Tabs.Screen
        name="[slug]/index"
        options={{
          title: "Browse Categories",
          href: {
            pathname: "/category/breakfast",
          },
         
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cart-arrow-down" color={color} />

          ),
        
        }}
      />
    </Tabs>
  );
}
