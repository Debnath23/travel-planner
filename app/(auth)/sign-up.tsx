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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onCreateUser = () => {
    if (!fullName && !email && !password) {
      ToastAndroid.show("Please enter all details.", ToastAndroid.BOTTOM);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("//mytrip");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage) {
          ToastAndroid.show("Invalid Credentials!", ToastAndroid.BOTTOM);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Create New Account</Text>

      {/* Full Name Input */}
      <TextInput
        placeholder="Full Name"
        placeholderTextColor={Colors.GRAY}
        style={styles.input}
        value={fullName}
        onChangeText={(value) => setFullName(value)}
      />
      {/* Username Input */}
      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.GRAY}
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      {/* Password Input */}
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.GRAY}
        secureTextEntry
        value={password}
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
      />

      {/* Create Account Button */}
      <TouchableOpacity style={styles.button} onPress={onCreateUser}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Back to Sign In Button */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/sign-in")}
      >
        <Text style={styles.secondaryButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
