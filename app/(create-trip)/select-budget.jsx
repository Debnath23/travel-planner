import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { budgetOptions } from "@/constants/Options";
import OptionCard from "@/components/OptionCard";
import { CreateTripContext } from "@/context/CreateTripContext";

const SelectBudget = () => {
  const [selectedBudget, setSelectedBudget] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    setTripData({
      ...tripData,
      buget: selectedBudget,
    });
  }, [selectedBudget]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>
      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 22,
          }}
        >
          Choose spending hobits for your trip
        </Text>
      </View>
      <FlatList
        data={budgetOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedBudget(item)}
          >
            <OptionCard item={item} selectedTraveler={selectedBudget} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/mytrip")}
      >
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectBudget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 85,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 35,
    fontFamily: "outfit-bold",
    marginBottom: 10,
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 9,
    marginHorizontal: 5,
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
});
