import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "../screeens/UserProfile";
import RideHistory from "../screeens/RideHistory";

const UserProfileStack = createNativeStackNavigator();

export default function UserProfileStackScreen() {
  return (
    <UserProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UserProfileStack.Screen name="UserProfile" component={UserProfile}/>
      <UserProfileStack.Screen name="RideHistory" component={RideHistory} />
    </UserProfileStack.Navigator>
  );
}