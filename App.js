import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { async } from './node_modules/expo-location/build/Location';

const { width : SCREEN_WIDTH } = Dimensions.get("window");
// const SCREEN_WIDTH = Dimensions.get("window").width
// console.log(SCREEN_WIDTH);

const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13";

export default function App() {
  const [district, setDistrict] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
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
    // console.log(location[0].district);
    setDistrict(location[0].district);

    // API 불러오기
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&APPID=${API_KEY}&units=metric`);
    const json = await response.json();
    // console.log(json.daily);
    setDays(json.daily);
  }
  useEffect(()=> {
    getWeather();
  }, [])

  return(
    <View style={styles.container}>
      <StatusBar style="light"/>
      <View style={styles.city}>
        <Text style={styles.cityName}>{district}</Text>
      </View>
      <ScrollView 
        pagingEnabled 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="black" style={{ marginTop: 10}} size="large" />
          </View>
        ) : (
          days.map((day, index) => 
          <View key={index} style={styles.day}>
            <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
            <Text style={styles.desc}>{day.weather[0].main}</Text>
            <Text style={styles.tinyText}>{day.weather[0].description}</Text>
          </View>
        )
        )}
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
    fontSize: 68,
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

  tinyText:{
    fontSize: 20,
  },  
})