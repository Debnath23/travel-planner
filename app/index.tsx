import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Redirect, useRouter } from "expo-router";
import { auth } from "@/config/firebaseConfig";

type Props = {};

export default function Index(props: Props) {
  const router = useRouter();
  const user = auth.currentUser;

  if (user) {
    return <Redirect href={"/mytrip"} />;
  };

  return (
    <View>
      <Image
        source={require("@/assets/images/login.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.container}>
        <Text style={styles.tagLine}>Travel Planner</Text>
        <Text style={styles.text}>
          Discover your next adventure effortlessly. Personalized itineraries at
          your fingertips. Travel smarter with AI-driven insights.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/sign-in")}
        >
          <Text style={styles.buttonText}>Sign In With Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "100%",
    padding: 10,
  },

  image: {
    width: "100%",
    height: 500,
  },

  tagLine: {
    fontSize: 24,
    fontFamily: "outfit-medium",
    textAlign: "center",
    marginTop: 5,
  },

  text: {
    fontFamily: "outfit",
    fontSize: 17,
    textAlign: "center",
    color: Colors.GRAY,
    marginTop: 5,
  },

  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: "10%",
  },

  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 17,
  },
});
