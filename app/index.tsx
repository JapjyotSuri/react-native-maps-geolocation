import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

const initialRegion = {
  latitude: 12.88991,
  longitude: 77.61387,
  latitudeDelta: 0.1, //determines the zoom level and the visible are of the map
  longitudeDelta: 0.1,
};
const chd = {
  latitude: 30.741482,
  longitude: 76.768066,
  latitudeDelta: 0.1, //determines the zoom level and the visible are of the map
  longitudeDelta: 0.1,
};

const index = () => {
  const mapRef = useRef<any>();
  function handlePress() {
    mapRef.current?.animateToRegion(chd);
  }
  function handlePressBanglore() {
    console.log("pressed");
    mapRef.current?.animateToRegion(initialRegion);
  }
  const [region, setRegion] = useState(initialRegion);
  const coordinates = [
    //using this to make a line on the map
    { latitude: 12.88991, longitude: 77.61387 },
    { latitude: 12.89, longitude: 77.614 },
    { latitude: 12.8905, longitude: 77.615 },
    { latitude: 12.891, longitude: 77.616 },
    { latitude: 12.892, longitude: 77.617 },
    { latitude: 12.893, longitude: 77.618 },
  ];
  const origin = {
    latitude: 12.88991,
    longitude: 77.61387,
    latitudeDelta: 0.1, //determines the zoom level and the visible are of the map
    longitudeDelta: 0.1,
  };
  const destination = {
    latitude: 12.893,
    longitude: 77.618,
    latitudeDelta: 0.1, //determines the zoom level and the visible are of the map
    longitudeDelta: 0.1,
  };
  useEffect(() => {
    async function getLocation() {
      // requesting permission below
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.5, //determines the zoom level and the visible are of the map
        longitudeDelta: 0.5,
      });
      console.log(
        "current location is: Latitude:  ",
        latitude,
        " longitude: ",
        longitude
      );
    }
    getLocation();

    //the below  code doesnt work in expo as expo doesnt support geolocation out of the box so we have to use expo loction
    // Geolocation.getCurrentPosition((currentPosition) => {
    //     const {latitude,longitude}=currentPosition.coords
    //     setRegion({
    //         latitude: latitude,
    //         longitude: longitude,
    //         latitudeDelta: 0.5,//determines the zoom level and the visible are of the map
    //         longitudeDelta: 0.5,
    //     })
    // });
  }, []);
  const openAppleMaps = () => {
    const url = `maps:0,0?q=${destination.latitude},${destination.longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening Apple Maps:", err)
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        initialRegion={origin}
        //   onRegionChange={(newRegion) => setRegion(newRegion)}//imp to write this if we want to show multiple markers on different coordinates may they me how so ever close to each other
        ref={mapRef}
        //using camera gives a 3d model view and as soon as we write camera the region property of map view gwts ignored by default
        //   camera={{
        //     center: {
        //       latitude: 37.78825,
        //       longitude: -122.4324,
        //     },
        //     zoom: 10,
        //     pitch: 20,
        //     heading: 2
        //   }}
      >
        {/* {
        coordinates.map((coordinate,index) => (
            <Marker coordinate={coordinate} key={index} title='location on line'/>
        ))
    } */}
        <Marker coordinate={origin} title="Start" />
        <Marker coordinate={destination} title="Destination" />

        {/* <Polyline coordinates={coordinates} strokeColor='red' strokeWidth={5}></Polyline> */}

        {/* <MapViewDirections this only works for google maps not apple maps
        origin={origin}
        destination={destination}
        ></MapViewDirections> */}
      </MapView>
      <Pressable
        style={{
          height: 50,
          width: 50,
          borderRadius: 30,
          position: "absolute",
          bottom: 70,
          right: 20,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={openAppleMaps}
      >
        <Text>Directions</Text>
      </Pressable>

      <Pressable
        style={{
          height: 50,
          width: 50,
          borderRadius: 30,
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handlePress}
      >
        <Text>Focus</Text>
      </Pressable>
      <Pressable
        style={{
          height: 50,
          width: 50,
          borderRadius: 30,
          position: "absolute",
          bottom: 20,
          left: 20,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handlePressBanglore}
      >
        <Text>Work</Text>
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
