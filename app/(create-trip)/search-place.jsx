import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import GoMapsAutocomplete from "@/hooks/GoMapsAutocomplete";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "@/context/CreateTripContext";

const api_key = process.env.EXPO_PUBLIC_GO_MAPS_API_KEY || "";

export default function SearchPlace() {
  const navigation = useNavigation();
  const { setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Search",
      headerTransparent: true,
    });
  }, [navigation]);

  const handlePlaceSelect = async (place) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${place.place_id}&key=${api_key}`
      );
      const data = await response.json();
      if (data.result) {
        setTripData({
          locationInfo: {
            name: place.description,
            coordinates: data.result.geometry.location,
            photoRef: data.result.photos[0].photo_reference,
            url: data.result.url,
          },
        });
        router.push("/select-traveler");
      } else {
        setTripData(null);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setTripData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Place</Text>
      <GoMapsAutocomplete
        apiKey={api_key}
        placeholder="Search for places"
        onPlaceSelect={handlePlaceSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.WHITE,
    paddingTop: 85,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    marginBottom: 10,
  },
});
