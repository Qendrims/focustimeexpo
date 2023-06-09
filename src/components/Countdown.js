import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native'; 
import { fontSizes, spacing} from "../units/sizes";
import { colors } from "../units/colors";


const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 3,
  isPaused,
  onProgress,
  onEnd
}) =>{
const[millis, setMinutesToMillies] = useState(null);    
const interval = React.useRef(null);
const countDown = () =>{
  setMinutesToMillies((time)=>{
    if(time === 0){
      clearInterval(interval.current);
      onEnd();
      return time;
    }
    const timeLeft = time - 1000;
    onProgress(timeLeft / minutesToMillis(minutes))
    return timeLeft;
  })
}

useEffect(() => {
  setMinutesToMillies(minutesToMillis(minutes))
},[minutes])

useEffect(() => {
  if(isPaused){
    if(interval.current) clearInterval(interval.current)
    return;
  }
  interval.current = setInterval(countDown, 1000);
  return () => clearInterval(interval.current)
},[isPaused])



const minute = Math.floor(millis / 1000 / 60) % 60;
const second = Math.floor(millis / 1000) % 60;
  return(
    <Text style={styles.text}>{formatTime(minute)} : {formatTime(second)}</Text>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    color : colors.white,
    padding: spacing.lg,
    backgroundColor : 'rgba(94,132,226,0.3)'
    
  }
})