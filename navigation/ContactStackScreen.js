import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Contact from "../screeens/Contact";
import CommunityForumScreen from "../screeens/CommunityForumScreen";

const ContactStack = createNativeStackNavigator();

export default function ContactStackScreen() {
  return (
    <ContactStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#b7ed55",
        },
        headerTintColor: "#000000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <ContactStack.Screen
        name="Contact"
        component={Contact}
        options={{ title : 'Help & Support' }}
      />
      <ContactStack.Screen
        name="CommunityForumScreen"
        component={CommunityForumScreen}
        options={{ title : 'Community Forum' }}
      />
    </ContactStack.Navigator>
  );
}
