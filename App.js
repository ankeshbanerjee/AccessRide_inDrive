import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "./screeens/Home";
import Contact from "./screeens/Contact";
import User from "./screeens/User";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 30;

            if (route.name === "Home") {
              iconName = focused
                ? "home"
                : "home-outline";
            } else if (route.name === "Contact") {
              iconName = focused ? "call" : "call-outline";
            } else if (route.name === "User") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown : false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          tabBarShowLabel : false,
          tabBarHideOnKeyboard : true,
          tabBarStyle : {
            borderRadius : 10,
            backgroundColor : "#b7ed55",
            height : 60,
            position : 'absolute',
            margin : 10,
            shadowColor : 'white',
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Contact" component={Contact} />
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
