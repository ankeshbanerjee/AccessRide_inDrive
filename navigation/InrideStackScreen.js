import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inride from "../screeens/Inride";
import Chat from "../screeens/Chat";


const InrideStack = createNativeStackNavigator();

export default function InrideStackScreen() {
  return (
    <InrideStack.Navigator
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
      <InrideStack.Screen
        name="InrideScreen"
        component={Inride}
        options={{ title : "Inride Screen" }}
      />
      <InrideStack.Screen
        name="ChatScreen"
        component={Chat}
        options={{ title: "Chat With your driver" }}
      />
    </InrideStack.Navigator>
  );
}