import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DriverDetails from "../screeens/DriverDetails";
import JourneyDetails from "../screeens/JourneyDetails";

const DriverDetailsStack = createNativeStackNavigator();

export default function DriverDetailsStackScreen() {
  return (
    <DriverDetailsStack.Navigator
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
      <DriverDetailsStack.Screen
        name="DriverDetails"
        component={DriverDetails}
        options={{ title: "Driver's Details" }}
      />
      <DriverDetailsStack.Screen
        name="JourneyDetails"
        component={JourneyDetails}
        options={{ title: "Your Journey Details" }}
      />
    </DriverDetailsStack.Navigator>
  );
}