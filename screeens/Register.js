import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { app, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
        })
          .then(() => {
            console.log(auth.currentUser.displayName, auth.currentUser.email)
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert("Email id already exists, try login!");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#006600", fontSize: 40, marginBottom: 60 }}>
        Welcome!
      </Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#0F6408"
        />
      </View>
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

      <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.forgot_button}>
        Already have an account?{" "}
        <Text
          style={{ color: "#0F6408" }}
          onPress={() => navigation.navigate("Login")}
        >
          Log In
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
    marginTop: 20,
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
