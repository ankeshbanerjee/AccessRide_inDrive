import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {app, auth} from '../firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert("invalid credetials, try again!")
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#006600", fontSize: 40, marginBottom: 60 }}>
        Welcome Again!
      </Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <Text style={{ position: "absolute", left: 35, top: 20 }}>
          {" "}
          <MaterialCommunityIcons name={"email"} size={20} color={"#0F6408"} />
        </Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#0F6408"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={{ position: "absolute", left: 35, top: 20 }}>
          {" "}
          <MaterialCommunityIcons name={"lock"} size={20} color={"#0F6408"} />
        </Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#0F6408"
          secureTextEntry={passwordVisible}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={styles.btnEye}
          onPress={() => {
            setPasswordVisible(!passwordVisible);
            setShow(!show);
          }}
        >
          <MaterialCommunityIcons
            name={show === false ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={"#0F6408"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.small_txt}>Or Log In With</Text>
      <View>
        <Image
          style={{ width: 70, height: 70 }}
          source={require("../assets/google.png")}
        />
      </View>
      <Text style={styles.forgot_button}>
        {" "}
        Don't have an account?{" "}
        <Text
          style={{ color: "#0F6408" }}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  small_txt: {
    height: 30,
    marginTop: 20,
    color: "#0F6408",
  },
  googleBtn: {
    width: "50px ",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#d9d9d9",
  },
  image: {
    width: "50px",
  },
  btnEye: {
    position: "absolute",
    right: 25,
    top: 20,
  },
  inputView: {
    backgroundColor: "#d9d9d9",
    borderRadius: 30,
    width: "70%",
    height: 60,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  forgot_button: {
    height: 30,
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#A7E92F",
  },
});
