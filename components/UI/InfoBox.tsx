import React from "react";
import {View, StyleSheet, ViewStyle} from 'react-native'
import ThemedText from "./ThemdText";
import ThemedLabel from "./ThemedLabel";

type Props = {
   darkMode: boolean,
   backgroudColor: string,
   text: string,
   label: string,
   textColor?: string,
   style?: ViewStyle,
}

const InfoBox = ({ darkMode, backgroudColor, text, label, style, textColor} : Props) => {
   return (
      <View style={{...styles.scoreSqare, backgroundColor: backgroudColor, ...style}}>
         <ThemedText darkMode={darkMode} style={{color: 'white'}}>{label}</ThemedText>
         <ThemedLabel darkMode={darkMode} style={{color: textColor ? textColor : 'white', fontSize: 60}}>{text}</ThemedLabel>
      </View>
   )
}

const styles = StyleSheet.create({
   scoreSqare: {
      alignItems: 'center',
      flex: 1,
      borderRadius: 10,
      paddingTop: 15
   },
})

export default InfoBox;