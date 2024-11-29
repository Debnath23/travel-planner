import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import FlightInfo from "@/components/FlightInfo";
import HotelList from "@/components/HotelList";
import TripPlan from "@/components/TripPlan";

function parseTripData(rawData) {
  if (typeof rawData !== "string") {
    return null;
  }

  try {
    const parsedData = JSON.parse(rawData);
    return parsedData;
  } catch (error) {
    return null;
  }
}

const TripDetails = () => {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();

  const [tripDetails, setTripDetails] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerShown: true,
    });

    if (trip) {
      const parsedTrip = parseTripData(trip);
      
      if (parsedTrip) {
        setTripDetails(parsedTrip);
      } else {
        setTripDetails({});
      }
    } else {
      setTripDetails({});
    }
  }, [navigation, trip]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Image
        source={require("@/assets/images/travel.jpg")}
        style={styles.img}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{tripDetails?.locationInfo.name}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.startDate}>{tripDetails?.statDate}</Text>
          <Text style={styles.startDate}>- {tripDetails?.endDate}</Text>
        </View>
        <View style={styles.travelerContainer}>
          <Image
            source={require("@/assets/icons/holiday-trip.png")}
            style={styles.logoImg}
          />
          <Text style={styles.traveler}>{tripDetails?.traveler}</Text>
        </View>
        {tripDetails?.tripPlan?.flights ? (
          <FlightInfo flightInfo={tripDetails.tripPlan.flights} />
        ) : (
          <Text>No flight information available.</Text>
        )}
        {tripDetails?.tripPlan?.hotels ? (
          <HotelList hotelInfo={tripDetails.tripPlan.hotels} />
        ) : (
          <Text>No hotel information available.</Text>
        )}
        {tripDetails?.tripPlan?.dailyItinerary ? (
          <TripPlan planInfo={tripDetails.tripPlan?.dailyItinerary} />
        ) : (
          <Text>Trip plan is not available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default TripDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto'
  },
  img: {
    width: "100%",
    height: 330,
    objectFit: "cover",
  },
  icon: {
    color: Colors.PRIMARY,
    width: 34,
    height: 34,
    marginRight: 8,
  },
  content: {
    height: "100%",
    padding: 15,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.WHITE,
  },
  title: {
    color: Colors.PRIMARY,
    marginBottom: 5,
    fontFamily: "outfit-bold",
    fontSize: 25,
    marginTop: 10,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  startDate: {
    fontSize: 18,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  travelerContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginTop: 5
  },
  logoImg: {
    width: 24,
    height: 24,
    objectFit: "cover",
    marginRight: 8,
  },
  traveler: {
    fontSize: 18,
    fontFamily: "outfit",
    color: Colors.GRAY,
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
