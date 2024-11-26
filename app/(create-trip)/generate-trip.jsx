import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import { CreateTripContext } from "@/context/CreateTripContext";
import { Colors } from "@/constants/Colors";
import { PROMPT } from "@/constants/Options";
import { chatSession } from "@/config/promptConfig";
import axiosInstance from "@/config/axiosInstance";

const GenerateTrip = () => {
  const { tripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const router = useRouter();

  const generateTrip = async () => {
    try {
      const FINAL_PROMPT = PROMPT.replace(
        "{location}",
        tripData?.locationInfo?.name
      )
        .replace("{totalDays}", tripData?.totalNoOfDays)
        .replace("{totalNight}", tripData?.totalNoOfDays - 1)
        .replace("{startDate}", tripData?.statDate)
        .replace("{endDate}", tripData?.endDate)
        .replace("{traveler}", tripData?.traveler?.title)
        .replace("{budget}", tripData?.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      const responseText = await result.response.text();

      let tripDetails;
      try {
        tripDetails = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        throw new Error("Failed to parse trip details.");
      }

      const response = await axiosInstance.post("/trip", {
        ...tripData,
        tripPlan: tripDetails,
      });

      console.log("Axios response data:", response.data);

      if (response.status === 201) {
        console.log("Trip successfully created: ", response.data);
        ToastAndroid.show("Trip created successfully!", ToastAndroid.LONG);
        router.replace("/mytrip");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error in generateTrip:", error);
      ToastAndroid.show(
        "Oops! Something went wrong. Please try later.",
        ToastAndroid.LONG
      );
    } finally {
      router.replace("/mytrip");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    if (tripData) {
      generateTrip();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Wait...</Text>
      <Text style={styles.subTitle}>We are working to generate your trip</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={100} color="#0000" />
      </View>
      <Text style={styles.text}>Don't Go Back</Text>
    </View>
  );
};

export default GenerateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  title: {
    color: Colors.PRIMARY,
    marginBottom: 5,
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginTop: 20,
    textAlign: "center",
  },
  subTitle: {
    color: Colors.PRIMARY,
    marginBottom: 20,
    fontFamily: "outfit-medium",
    fontSize: 18,
    textAlign: "center",
  },
  videoContainer: {
    marginTop: 60,
  },
  video: {
    width: "100%",
    height: 300,
  },
  text: {
    fontFamily: "outfit-medium",
    color: Colors.GRAY,
    fontSize: 16,
    textAlign: "center",
    marginTop: "40%",
  },
});
