import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const { width : SCREEN_WIDTH } = Dimensions.get("window");
// const SCREEN_WIDTH = Dimensions.get("window").width
// console.log(SCREEN_WIDTH);
const API_KEY = "09ccd72a24f2ae9530ae57fe5dbc6d21";
const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
  };

export default function App() {
  const [district, setDistrict] = useState("Loading...");
  const [days, setDays] = useState([]);
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
      // 권한 수락 안했을때 반응(alert, 다시허가할 수 있게 하는 옵션 추가하기)
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
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts, hourly&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    console.log(json.daily);
    setDays(json.daily);
  }
  useEffect(()=> {
    ask();
  }, [])

  return(
    <View style={styles.container}>
      <StatusBar style="light"/>
      <Text>{}</Text>
      <View style={styles.city}>
        <Text style={styles.cityName}>{region} </Text>
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
            <ActivityIndicator size="large" />
          </View>
        ) : (
          
            days.map((day, index) => 
            <View key={index} style={styles.day}>
              <View 
                style={{ 
                  flexDirection: "row", 
                  }}
              >
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(0)}</Text>
                <Fontisto 
                  name={icons[day.weather[0].main]} 
                  size={120} 
                  style={{marginTop: 0}}
                />             
              </View>
              <Text style={styles.desc}>{day.weather[0].main}</Text>
              <Text style={styles.desc_detail}>{day.weather[0].description}</Text>
            </View>
          )
          
        )
        }
      </ScrollView>
    </View>  
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1, backgroundColor: "#E5C50E"
  },

  city: {
    flex: 1.2,
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    
    marginTop: 50,
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
    alignItems: "center",
    
  },
  temp: {
    fontSize: 180,
    
  },

  desc: {
    fontSize: 60,
    marginTop: -30,
  },

  desc_detail: {
    fontSize: 20,
    backgroundColor: "rgba(227, 205, 98, 0.5)",
  },
})