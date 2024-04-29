import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions, } from "react-native";
import { async } from './node_modules/expo-location/build/Location';

const { width : SCREEN_WIDTH } = Dimensions.get("window");
// const SCREEN_WIDTH = Dimensions.get("window").width
// console.log(SCREEN_WIDTH);

export default function App() {
  const [district, setDistrict] = useState("Loading...");
  const [region, setRegion] = useState("");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async() => {
    // 1. (위치)권한요청
    // const permission = await Location.requestForegroundPermissionsAsync();
    // console.log(permission);
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    // 2. 유저의 위치 정보 얻기
    // const location = await Location.getCurrentPositionAsync({ accuracy: 5});
    // console.log(location);
    const { coords: {latitude , longitude}} = await Location.getCurrentPositionAsync({ accuracy: 5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude}, 
      {useGoogleMaps:false}
    );
    // console.log(location[0].region);
    setDistrict(location[0].district);
    setRegion(location[0].region);

  }
  useEffect(()=> {
    ask();
  }, [])

  return(
    <View style={styles.container}>
      <StatusBar style="light"/>
      <View style={styles.city}>
        <Text style={styles.cityName}>{region} </Text>
        <Text style={styles.cityName}>{district}</Text>
      </View>
      <ScrollView 
        pagingEnabled 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </ScrollView>
    </View>  
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1, backgroundColor: "teal"
  },

  city: {
    flex: 1.2,
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 50,
    fontWeight: "500",
  },
  weather: {
    // flex: 3,
    // backgroundColor: "red"
  },
  day: {
    width: SCREEN_WIDTH,
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "teal",
  },
  temp: {
    fontSize: 170,
    marginTop: 50,
  },
  desc: {
    fontSize: 60,
    marginTop: -30,
  },
})