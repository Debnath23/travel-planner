import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await AsyncStorage.setItem("accessToken", "");
      await AsyncStorage.setItem("refreshToken", "");
      ToastAndroid.show("Logout successfull!", ToastAndroid.BOTTOM);
      router.replace('/sign-in')
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        "Logout failed. Please try again.",
        ToastAndroid.BOTTOM
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelText}>Profile</Text>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
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
  button: {
    padding: 15,
    backgroundColor: "#BCECE0",
    borderRadius: 9,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.PRIMARY,
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
});
