import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "../screeens/UserProfile";
import RideHistory from "../screeens/RideHistory";

const UserProfileStack = createNativeStackNavigator();

export default function UserProfileStackScreen() {
  return (
    <UserProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#b7ed55",
        },
        headerTintColor: "#000000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerShadowVisible: false,
      }}
    >
      <UserProfileStack.Screen name="UserProfile" component={UserProfile} options={{title : "Your Profile"}}/>
      <UserProfileStack.Screen name="RideHistory" component={RideHistory} options={{title : "Past Rides"}}/>
    </UserProfileStack.Navigator>
  );
}