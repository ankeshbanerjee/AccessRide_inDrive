import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Timer = (props) => {
  const [time, setTime] = useState(props.time * 60); // 10 minutes in seconds

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerInterval);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Arriving Timer: {formatTime(time)}</Text>
      <FontAwesome name="bell" size={24} color="black" style={{marginLeft : 10}}/>
    </View>
  );
};


const styles = StyleSheet.create({
    container : {
        width : '100%',
        paddingVertical : 10,
        backgroundColor : '#b7ed55',
        flexDirection : 'row',
        justifyContent : 'center'
    },
    text : {
        fontSize : 20,
        fontWeight : "bold",
    }
})

export default Timer;
