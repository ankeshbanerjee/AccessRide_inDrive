import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmergencyContacts from "../screeens/EmergencyContacts";
import EmergencyButtonScreen from "../screeens/EmergencyButtonScreen";

const EmergencyStack = createNativeStackNavigator();

export default function EmergencyStackScreen() {
  return (
    <EmergencyStack.Navigator
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
      <EmergencyStack.Screen
        name="EmergencyContacts"
        component={EmergencyContacts}
        options={{ title: "Emergency Contacts" }}
      />
      <EmergencyStack.Screen
        name="EmergencyButtonScreen"
        component={EmergencyButtonScreen}
        options={{ title: "Emergency Button" }}
      />
    </EmergencyStack.Navigator>
  );
}