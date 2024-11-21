import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Discover() {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelText}>Discover</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.WHITE,
  },
  label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: Colors.WHITE,
  },
  labelText: {
    fontFamily: "outfit-bold",
    fontSize: 35,
  },
});
