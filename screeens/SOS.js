import {StyleSheet, View, Text, Button, PermissionsAndroid,Image, TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import React, { useState } from "react";

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const SOS = () => {
 
  const [location, setLocation] = useState(false);
 
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
           
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
    };
    const sendLocation = () => {
        try {
          if (location) {
            const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
            const url = `https://twitter.com/intent/tweet?text=${tweet}`;
            Linking.openURL(url);
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
      <View style={styles.container}>
           <View>
          <Image style={{width:200, height:200}} source={require('../assets/sos.png')}/>
          </View>
          <Text style={{color:'red',fontSize:30, marginTop:20}}>Need Help??</Text>
         
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '70%'}}>
              <TouchableOpacity style={{ width: "100%",
                    borderRadius: 25,
                  
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                      backgroundColor: "#d9d9d9",}}  onPress={getLocation} ><Text style={{fontSize:20,fontWeight:500}}>Get Location</Text></TouchableOpacity>
      </View>
      <Text style={{marginTop:10,color:"#0F6408" ,fontSize:20,fontWeight:500}}>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text style={{color:"#0F6408" ,fontSize:20,fontWeight:500}}>Longitude: {location ? location.coords.longitude : null}</Text>
      <View
              style={{  padding: 10, borderRadius: 10, width: '70%' }}>
                <TouchableOpacity style={{ width: "100%",
                    borderRadius: 25,
                  
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                      backgroundColor: "#A7E92F",}}  onPress={sendLocation} ><Text style={{fontSize:20,fontWeight:500}}>Send Location</Text></TouchableOpacity>
      
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
        justifyContent: 'center',
    backgroundColor:"#fff"
  },
});
export default SOS;