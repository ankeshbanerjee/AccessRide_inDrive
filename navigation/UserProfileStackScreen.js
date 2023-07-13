import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "../screeens/UserProfile";
import RideHistory from "../screeens/RideHistory";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { app, auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const UserProfileStack = createNativeStackNavigator();

export default function UserProfileStackScreen() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("logged out!");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };

  return (
    <UserProfileStack.Navigator
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
      <UserProfileStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: "Your Profile",
          headerRight: () => (
            <TouchableOpacity onPress={handleSignOut}>
              <Entypo name="log-out" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <UserProfileStack.Screen
        name="RideHistory"
        component={RideHistory}
        options={{ title: "Past Rides" }}
      />
    </UserProfileStack.Navigator>
  );
}
