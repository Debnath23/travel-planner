import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import { CreateTripContext } from "@/context/CreateTripContext";
import { Colors } from "@/constants/Colors";
import { Video } from "expo-av";
import { PROMPT } from "@/constants/Options";
import { chatSession } from "@/config/promptConfig";
import { uuid } from "uuid";
import { auth, db } from "@/config/firebaseConfig";

const GenerateTrip = () => {
  const [loading, setLoading] = useState(false);
  const { tripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const router = useRouter();
  const user = auth.currentUser;

  const generateTrip = async () => {
    try {
      setLoading(true);
  
      const FINAL_PROMPT = PROMPT.replace("{location}", tripData?.locationInfo?.name)
        .replace("{totalDays}", tripData?.totalNoOfDays)
        .replace("{totalNight}", tripData?.totalNoOfDays - 1)
        .replace("{traveler}", tripData?.traveler?.title)
        .replace("{budget}", tripData?.budget);
  
      console.log("Generated FINAL_PROMPT:", FINAL_PROMPT);
  
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();
  
      console.log("Raw API response:", responseText);
  
      if (!result.response.ok) {
        throw new Error(`API error: ${result.response.status}`);
      }
  
      try {
        const tripResponse = JSON.parse(responseText);
        console.log("Parsed tripResponse:", tripResponse);
  
        const docId = new uuid();
        await setDoc(doc(db, "UserTrip", docId), {
          docId: docId,
          userEmail: user.email,
          tripPlan: tripResponse,
          tripData: JSON.stringify(tripData),
        });
  
        router.replace("/mytrip");
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError, "Response text:", responseText);
        throw new Error("Failed to parse API response as JSON.");
      }
    } catch (error) {
      console.error("Error in generateTrip:", error);
      ToastAndroid.show('Oops! Something went wrong. Please try later.', ToastAndroid.LONG);
      router.replace("/mytrip");
    } finally {
      setLoading(false);
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
      <View style={styles.videoContainer}>
        <Video
          source={{
            uri: "https://d1jj76g3lut4fe.cloudfront.net/processed/filter/thumb/2Xs1W9Z2jB16b17d1m.mp4?Expires=1732186921&Signature=JqcczAUgy-A609~wk0wX3rxL5dDYahu7~6ZiDsMsh8BJsLZ2ZYsmdmPqgi-CH0xUHZKYCAGOKofbyafhfSDvCiJk0czwlcmtF1-YD6o93CLbKoWXkTkDcIuRGcn-GOFeMXXE7XK2onCQHZ9GsU9qsm9zbvqlIPb7QohUFQ-qdfiyIgdenNdzV0bD3Yb9ADezb2JGNHZyP0QEfnTxhaXlJuAJgAuT6pk3Z~~-knR6cUKI0qQrArOCME30Ewae2W3Rwm2hICdHBpa86putO5RC9SG7UtMPGwECDyh3rKWw5J05xELj6RbsnudC0C~Tl1ohXBQXJIwfMQ3tCp4OEuRpxA__&Key-Pair-Id=K2YEDJLVZ3XRI#t=0.001",
          }}
          style={styles.video}
          controls={false}
          resizeMode="contain"
          isLooping
          shouldPlay
        />
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
