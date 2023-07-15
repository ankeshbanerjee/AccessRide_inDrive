import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import JourneyDetails from "../screeens/JourneyDetails";
import InrideStackScreen from "./InrideStackScreen";

const JourneyDetailsStack = createNativeStackNavigator();

export default function JourneyDetailsStackScreen() {
  return (
    <JourneyDetailsStack.Navigator
      screenOptions={{
        headerStyle: {
            backgroundColor: "#b7ed55"
          },
          headerTintColor: "#000000",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerShadowVisible: false,
      }}
    >
      <JourneyDetailsStack.Screen
        name="JourneyDetailsScreen"
        component={JourneyDetails}
        options={{ title: "Your Journey Details" }}
      />
      <JourneyDetailsStack.Screen
        name="Inride"
        component={InrideStackScreen}
        options={{ headerShown : false }}
      />
    </JourneyDetailsStack.Navigator>
  );
}