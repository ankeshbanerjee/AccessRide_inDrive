import React, { useEffect } from "react";
import { Fontisto } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    View,
    Image,
    
} from "react-native";


 
const Splash = ({navigation}) => {
   
    useEffect(() => {
        
      const timer= setTimeout( () => {
            navigation.navigate('AccessRide')
        }, 3000)  

        return ()=>clearTimeout(timer)
        
    },[navigation])
      

    return(
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:"#A7E92F"}}>
        <Text style={{fontSize:30, fontWeight:"bold", color:'#0F6408' }}>A<Fontisto name="paralysis-disability" size={25} color="#0F6408" />cessRide</Text>
        </View>
    )
} 
 export default Splash