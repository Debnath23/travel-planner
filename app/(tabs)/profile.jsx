import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/userSlice";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user.name);

  const onLogout = async () => {
    try {
      await AsyncStorage.setItem("accessToken", "");
      await AsyncStorage.setItem("refreshToken", "");
      dispatch(clearUser());
      ToastAndroid.show("Logout successful!", ToastAndroid.BOTTOM);
      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        "Logout failed. Please try again.",
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("@/assets/images/img.jpeg")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Debnath Mahapatra</Text>
        <Text style={styles.email}>debnath@gmail.com</Text>
        <Text style={styles.email}>{user}</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        <MenuItem
          title="Edit Profile"
          icon={
            <Ionicons name="person-circle-outline" size={24} color="#6C63FF" />
          }
          onPress={() => console.log("Edit Profile")}
        />
        <MenuItem
          title="Settings"
          icon={<Ionicons name="settings-outline" size={24} color="#2ECC71" />}
          onPress={() => console.log("Settings")}
        />
        <MenuItem
          title="Privacy Policy"
          icon={<MaterialIcons name="privacy-tip" size={24} color="#555555" />}
          onPress={() => console.log("Privacy Policy")}
        />
        <MenuItem
          title="Logout"
          icon={<Ionicons name="log-out-outline" size={24} color="#E74C3C" />}
          onPress={onLogout}
        />
      </View>
    </ScrollView>
  );
}

const MenuItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>{icon}</View>
    <Text style={styles.menuText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#aaa" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    paddingVertical: 30,
    paddingTop: 80,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    color: "#333",
    fontFamily: "outfit-bold",
  },
  email: {
    fontSize: 15,
    color: "#777",
    fontFamily: "outfit",
  },
  menuSection: {
    width: "90%",
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "outfit-medium",
  },
});
