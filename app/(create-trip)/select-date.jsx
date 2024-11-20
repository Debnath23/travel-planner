import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { CreateTripContext } from "@/context/CreateTripContext";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { differenceInDays } from "date-fns";

const SelectDate = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const navigation = useNavigation();
  const router = useRouter();

  const { tripData, setTripData } = useContext(CreateTripContext);

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(moment(date));
    } else {
      setSelectedStartDate(moment(date));
      setSelectedEndDate(null);
    }
  };

  const onDateSelectionContinue = () => {
    if (!selectedStartDate && !selectedEndDate) {
      ToastAndroid.show("Please select Start and End date", ToastAndroid.LONG);
      return;
    }

    const totalNoOfDays = differenceInDays(endDate, startDate);

    if (selectedStartDate && selectedEndDate) {
      setTripData({
        ...tripData,
        statDate: startDate,
        endDate: endDate,
        totalNoOfDays: totalNoOfDays + 1,
      });
      router.push("/select-budget");
    }
  };

  const minDate = new Date();
  const maxDate = new Date(2025, 6, 3);
  const startDate = selectedStartDate ? selectedStartDate.toString() : "";
  const endDate = selectedEndDate ? selectedEndDate.toString() : "";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    onDateSelectionContinue();
  }, [selectedStartDate, selectedEndDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.travelDate}>Travel Date</Text>
      <View style={styles.datePicker}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          maxRangeDuration={5}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={onDateSelectionContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 65,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  travelDate: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginTop: 20,
  },
  datePicker: {
    marginTop: 10,
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 9,
    marginHorizontal: 5,
    marginTop: "70%",
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
});
