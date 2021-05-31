import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
   max : number,
   current: number,
   color: string
}

const ProgressIndicator = ({darkMode, style, current, max, color} : Props) => {
   const {textColor, backgroundColorMain, textStyle} = Colors.getColors(darkMode)
   const percent = current / max;
   return (
      <View style={{...styles.indicator, ...backgroundColorMain, ...style}}>
         <View style={{width : percent * 100 + '%', backgroundColor: color,  borderRadius: 20, ...styles.indicatorBar}}>
            <Text style={{color: 'white', ...textStyle}}>{current}h</Text>
         </View>
         <View style={{width :  100 - (percent * 100) + '%', ...styles.indicatorBar}}>
            <Text style={{...textColor, ...textStyle}}>{max - current}h</Text>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   indicator: {
      width: '100%',
      height: 35,
      borderRadius: 20,
      flexDirection: 'row'
   },
   indicatorBar: {
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center',
   }
})

export default ProgressIndicator;