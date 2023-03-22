import  React, {useState} from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import Constants from 'expo-constants';
import {TextInput} from "react-native-paper";
import {RoundedButton} from "../../components/RoundedButton";
import { fontSizes, spacing} from "../../units/sizes";
import { colors } from "../../units/colors";
// You can import from local files

// or any pure javascript modules available in npm
//preferohet te deklarohet si const para default function 
//Platform element qe mundes me bo style te ndryshem per platforma te ndryshme IOS or Android
export const Focus = ({addSubject}) => {
  const[subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>What would you like to focuss on?</Text>
      <View style={styles.inputContainer}>
      <TextInput style={{flex:1, marginRight:spacing.md}} onSubmitEditing={
        ({ nativeEvent }) => {
          setSubject(nativeEvent.text)
        }}
        />
      <RoundedButton size={50} title = "+"  onPress={() => {
        addSubject(tempItem)
      }}/>
      </View>
    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer:{
    flex:0.5,
    padding: spacing.md,
    justifyContent:'center'
  },
  title:{
    color:colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg
  },
  inputContainer:{
    paddingTop:spacing.md,
    flexDirection:'row'
  }
});
