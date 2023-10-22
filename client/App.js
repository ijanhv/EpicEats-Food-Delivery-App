import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./src/screens/Home";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import BasketScreen from "./src/screens/BasketScreen";
import PreparingOrderScreen from "./src/screens/PreparingOrderScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import registerNNPushToken from "native-notify";

import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";


const Stack = createNativeStackNavigator();


const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="PreparingOrderScreen"
              component={PreparingOrderScreen}
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
