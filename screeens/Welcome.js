import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
const Welcome= ({navigation}) => {
    return (
        <View style={{flex:1, paddingTop : 45}}>
            <Image source={require('../assets/hero3.png')}
            style={{width:400,height:300}}
            />
            <View style={{
                paddingHorizontal: 22,
            }}>
                <Text style={{
                    
                      marginLeft:18,
                    fontSize: 25,
                    fontWeight: 400,
                    marginTop: 50
                    
                }}> Building Consciousness</Text>
                <Text style={{
                       
                    fontSize: 30,
                    fontWeight: 500,
                    marginLeft: 20,
                    marginTop: 7,
                    color:'#0F6408'
                    
                }}> Building The Future</Text>
            </View>
            
            <View>
                <TouchableOpacity style={{
                      width: "70%",
                    borderRadius: 25,
                    marginLeft:50,
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                      backgroundColor: "#A7E92F",
                }} onPress={() =>
                    navigation.navigate('Login')}>
        <Text>Log In</Text> 

      </TouchableOpacity> 
           
     
    
            </View>
            <View>
                <TouchableOpacity style={{
                      width: "70%",
                    borderRadius: 25,
                      marginLeft:50,
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                      backgroundColor: "#d9d9d9",
                }} onPress={() =>
                    navigation.navigate('Register')}>
        <Text>Register</Text> 

      </TouchableOpacity> 
           
     
    
            </View>
            </View>
      
       
    )
}
export default Welcome