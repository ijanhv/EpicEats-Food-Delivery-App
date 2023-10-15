import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "./LoginScreen";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeIcon } from "react-native-heroicons/outline";
import { Ionicons } from "@expo/vector-icons";
import Cart from "./Cart";
import ProfileScreen from "./Profile";
import MyOrdersScreen from "./MyOrders";

const Tab = createBottomTabNavigator();

function Home() {
  const navigation = useNavigation();

  const getTabBarIcon = (route, focused, color, size) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "ios-home" : "ios-home-outline";
    } else if (route.name === "Cart") {
      iconName = focused ? "ios-cart" : "ios-cart-outline";
    } else if (route.name === "Profile") {
      iconName = focused ? "ios-person" : "ios-person-outline";
    } else if (route.name === "My Orders") {
      iconName = focused ? "ios-list" : "ios-list-outline";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return getTabBarIcon(route, focused, color, size);
        },
        tabBarActiveTintColor: "#00CCBB",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      
      <Tab.Screen
        name="My Orders"
        component={MyOrdersScreen}
        options={{ headerShown: false }}
      />
      
    </Tab.Navigator>
  );
}

export default Home;