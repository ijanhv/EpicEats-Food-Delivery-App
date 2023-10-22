import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import EditScreenInfo from "../../components/EditScreenInfo";
import { useFetchMenuItemsQuery } from "../../hooks/useMenuItemQuery";

export default function TabOneScreen() {
  const { data: menuItems } = useFetchMenuItemsQuery();

  return (
    <View className="flex-1 justify-center">
      <Text className="text-red-800 text-xl">HELLO WORLD</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
