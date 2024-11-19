import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function OptionCard({ item, selectedTraveler }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          selectedTraveler?.id == item?.id && { borderWidth: 1 },
        ]}
      >
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.desc}>{item?.desc}</Text>
          <Text style={styles.people}>{item?.people}</Text>
        </View>
        <Image source={item?.icon} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 5,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
    backgroundColor: Colors.LIGHT_GRAY,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 9,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  desc: {
    fontSize: 15,
    fontFamily: "outfit-medium",
    color: Colors.GRAY,
  },
  people: {
    fontSize: 12,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  icon: {
    width: 35,
    height: 35,
  },
});
