import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "./screeens/Home";
import Contact from "./screeens/Contact";
import User from "./screeens/User";
import Drivers from "./screeens/Drivers";
import DriverDetails from "./screeens/DriverDetails";


const DriversStack = createNativeStackNavigator();

function DriversStackScreen() {
  return (
    <DriversStack.Navigator screenOptions={{
      headerStyle: {
            backgroundColor: '#b7ed55',
          },
      headerTintColor: 'black',
      headerTitleAlign : 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <DriversStack.Screen name="Drivers" component={Drivers} options={{title: 'Available drivers'}}/>
      <DriversStack.Screen name="DriverDetails" component={DriverDetails} options={{title: 'Driver Details'}}/>
    </DriversStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown : false
    }}>
      <HomeStack.Screen name="Home" component={Home}/>
      <HomeStack.Screen name="DriversScreen" component={DriversStackScreen}/>
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 30;

            if (route.name === "HomeScreen") {
              iconName = focused
                ? "home"
                : "home-outline";
            } else if (route.name === "ContactScreen") {
              iconName = focused ? "call" : "call-outline";
            } else if (route.name === "UserScreen") {
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
        <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
        <Tab.Screen name="ContactScreen" component={Contact} />
        <Tab.Screen name="UserScreen" component={User} />
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
