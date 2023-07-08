import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screeens/Home";
import DriversStackScreen from "./DriversStackScreen";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home}/>
      <HomeStack.Screen name="DriversScreen" component={DriversStackScreen} />
    </HomeStack.Navigator>
  );
}