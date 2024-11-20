import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import { CreateTripContext } from "@/context/CreateTripContext";
import { Colors } from "@/constants/Colors";

const ReviewTrip = () => {
  const { tripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerShown: true,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review your trip</Text>
      <Text style={styles.subTitle}>Before generating your trip, please review your selection</Text>

      <View style={styles.detailItem}>
        <Image source={require("@/assets/icons/map.png")} style={styles.icon} />
        <View style={styles.content}>
          <Text style={styles.label}>Destination</Text>
          <Text style={styles.value}>{tripData?.locationInfo?.name}</Text>
        </View>
      </View>

      <View style={styles.detailItem}>
        <Image
          source={require("@/assets/icons/diversity.png")}
          style={styles.icon}
        />
        <View style={styles.content}>
          <Text style={styles.label}>Travelers</Text>
          <Text style={styles.value}>{tripData?.traveler?.title}</Text>
        </View>
      </View>

      <View style={styles.detailItem}>
        <Image
          source={require("@/assets/icons/calendar.png")}
          style={styles.icon}
        />
        <View style={styles.content}>
          <Text style={styles.label}>Selected Dates</Text>
          <Text style={styles.value}>
            {tripData?.statDate} to {tripData?.endDate} (
            {tripData?.totalNoOfDays} Days)
          </Text>
        </View>
      </View>

      <View style={styles.detailItem}>
        <Image
          source={require("@/assets/icons/travel.png")}
          style={styles.icon}
        />
        <View style={styles.content}>
          <Text style={styles.label}>Budget</Text>
          <Text style={styles.value}>{tripData?.budget}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.replace("/generate-trip")}>
        <Text style={styles.buttonText}>Build My Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  icon: {
    color: Colors.PRIMARY,
    width: 34,
    height: 34,
    marginRight: 8,
  },
  content: {
    justifyContent: "center",
    paddingRight: 20,
  },
  title: {
    color: Colors.PRIMARY,
    marginBottom: 5,
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginTop: 20,
  },
  subTitle: {
    color: Colors.PRIMARY,
    marginBottom: 20,
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontFamily: "outfit-medium",
    marginTop: 4,
  },
  value: {
    fontSize: 15,
    color: Colors.GRAY,
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 9,
    marginHorizontal: 5,
    marginTop: "60%",
  },
  buttonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
});
