import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

import HomeStackScreen from "./HomeStackScreen";
import Contact from "../screeens/Contact";
import UserProfile from "../screeens/UserProfile";
import Settings from "../screeens/Settings";
import EmergencyContacts from '../screeens/EmergencyContacts'
import UserProfileStackScreen from "./UserProfileStackScreen";
import ContactStackScreen from "./ContactStackScreen";
import EmergencyStackScreen from "./EmergencyStackScreen";


import Ionicons from "react-native-vector-icons/Ionicons";

import * as Haptics from "expo-haptics";
import * as Speech from 'expo-speech';




const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 30;

            if (route.name === "HomeScreen") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "ContactScreen") {
              iconName = focused ? "call" : "call-outline";
            } else if (route.name === "UserScreen") {
              iconName = focused ? "person" : "person-outline";
            }else if (route.name === "SettingsScreen") {
              iconName = focused ? "settings" : "settings-outline";
            }else if (route.name === "EmergencyScreen") {
              iconName = focused ? "warning" : "warning-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: "#b7ed55",
            // borderBottomLeftRadius : 15,
            // borderBottomRightRadius : 15,
            // height : 100
          },
          headerTintColor: "#000000",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerShadowVisible: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            borderRadius: 10,
            backgroundColor: "#b7ed55",
            height: 60,
            position: "absolute",
            margin: 10,
            shadowColor: "white",
          },
        })}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          listeners={() => ({
            tabPress: () => {
              Speech.speak('Home Screen')
              Haptics.selectionAsync();
            },
          })}
          options={{headerShown : false}}
        />
        <Tab.Screen
          name="ContactScreen"
          component={ContactStackScreen}
          listeners={() => ({
            tabPress: () => {
              Speech.speak('Help & Support')
              Haptics.selectionAsync();
            },
          })}
          options={{headerShown : false}}
        />
        <Tab.Screen
          name="UserScreen"
          component={UserProfileStackScreen}
          listeners={() => ({
            tabPress: () => {
              Speech.speak('User profile')
              Haptics.selectionAsync();
            },
          })}
          options={{headerShown : false}}
        />
        <Tab.Screen
          name="SettingsScreen"
          component={Settings}
          listeners={() => ({
            tabPress: () => {
              Speech.speak('Accessibility settings')
              Haptics.selectionAsync();
            },
          })}
          options={{title : "Accessibility settings"}}
        />
        <Tab.Screen
          name="EmergencyScreen"
          component={EmergencyStackScreen}
          listeners={() => ({
            tabPress: () => {
              Speech.speak('Emergency Contacts')
              Haptics.selectionAsync();
            },
          })}
          options={{title : "Emergency Contacts", headerShown : false}}
        />
      </Tab.Navigator>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});