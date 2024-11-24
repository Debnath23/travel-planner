import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "@/config/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  const onCreateUser = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!name) {
      ToastAndroid.show("Name is required.", ToastAndroid.BOTTOM);
      return;
    }
    if (!email) {
      ToastAndroid.show("Email is required.", ToastAndroid.BOTTOM);
      return;
    }
    if (!password) {
      ToastAndroid.show("Password is required.", ToastAndroid.BOTTOM);
      return;
    }

    try {
      const requestBody = { name, email, password };
      const response = await axiosInstance.post("/auth/register", requestBody);

      if (response.status === 201) {
        const token = response.data.accessToken;

        if (token) {
          await AsyncStorage.setItem("isLoggedIn", "true");
          window.dispatchEvent(new Event("loginStatusChanged"));
          router.replace("/mytrip");
        }
      } else {
        ToastAndroid.show("Something went wrong!", ToastAndroid.BOTTOM);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Create New Account</Text>

          {/* Full Name Input */}
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={Colors.GRAY}
            style={styles.input}
            value={name}
            onChangeText={(value) => setName(value)}
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
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Create Account Button */}
          <TouchableOpacity style={styles.button} onPress={onCreateUser}>
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          {/* Back to Sign In Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
