import React, { useContext, useEffect, useState } from "react";
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
import { UserInfoContext } from "@/context/UserInfoContext";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {setUserData} = useContext(UserInfoContext);

  const onSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (!email) {
      ToastAndroid.show("Email is required.", ToastAndroid.BOTTOM);
      return;
    }
    if (!password) {
      ToastAndroid.show("Password is required.", ToastAndroid.BOTTOM);
      return;
    }

    try {
      const requestBody = { email, password };
      const response = await axiosInstance.post("/auth/login", requestBody);

      if (response.status === 201) {
        const { accessToken, refreshToken, user } = response.data;

        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        dispatch(setUser(user));
        router.replace("/mytrip");
      }
    } catch (error: any) {
      ToastAndroid.show("Login failed. Please try again.", ToastAndroid.BOTTOM);
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
            onChangeText={(value) => setPassword(value)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Sign In Button */}
          <TouchableOpacity style={styles.button} onPress={onSignIn}>
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/sign-up")}
          >
            <Text style={styles.secondaryButtonText}>Create New Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
