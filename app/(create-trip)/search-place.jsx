import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useLayoutEffect } from "react";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

uuidv4();

export default function SearchPlace() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Search",
      headerTransparent: true,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Place</Text>
      {/* <TextInput style={styles.input} placeholder="Type your destination..." /> */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(data, details);
          console.log(">>>>>>>>>>>>>>>>>>>");
          
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
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
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});
