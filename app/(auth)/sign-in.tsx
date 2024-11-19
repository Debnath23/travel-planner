import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const navigation = useNavigation();

  const onSignIn = () => {
    if (!email && !password) {
      ToastAndroid.show("Please enter all details.", ToastAndroid.BOTTOM);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("/mytrip");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage) {
          ToastAndroid.show("Invalid Credentials!", ToastAndroid.BOTTOM);
        }
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Let's Sign You In</Text>
      <Text style={styles.subHeader}>Welcome Back</Text>
      <Text style={styles.subHeader}>You've been missed!</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.GRAY}
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value.trim())}
      />
      {/* Password Input */}
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.GRAY}
        secureTextEntry
        value={password}
        style={styles.input}
        onChangeText={(value) => setPassword(value.trim())}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/sign-up")}
      >
        <Text style={styles.secondaryButtonText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "outfit",
    color: Colors.GRAY,
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontFamily: "outfit",
  },
  button: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 15,
  },
  secondaryButtonText: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
    fontSize: 14,
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});
