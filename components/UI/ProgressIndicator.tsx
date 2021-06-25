import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
   max : number,
   current: number,
   color: string,
   delayAnimation? : number
}

const ProgressIndicator = ({darkMode, style, current, max, color, delayAnimation} : Props) => {
   const {textColor, backgroundColorMain, textStyle} = Colors.getColors(darkMode)
   const percent = current / max;

   const widthDone = useRef(new Animated.Value(0)).current;
   const widthNotDone = useRef(new Animated.Value(100)).current;

   useEffect(() => {
      const animate = () => {
         Animated.timing(widthDone, {
            toValue: 100 * percent,
            duration: 500,
            delay: 500,
            useNativeDriver: false
         }).start();
         Animated.timing(widthNotDone, {
            toValue: 100 - (100 * percent),
            duration: 500,
            delay: 500,
            useNativeDriver: false
         }).start();
      }
      let percent = current / max;
      if(percent > 1) percent = 1;
      if(delayAnimation){
         setTimeout(animate, delayAnimation)
      } else {
         animate()
      }
      
      
   }, [max, current])


   return (
      <View style={{...styles.indicator, ...backgroundColorMain, ...style}}>
         <Animated.View style={{width : widthDone.interpolate({inputRange : [0,100], outputRange : ['0%', '100%']}), backgroundColor: color,  borderRadius: 20, ...styles.indicatorBar}}>
            <Text style={{color: 'white', ...textStyle}}>{current}h</Text>
         </Animated.View>
         <Animated.View style={{width :  widthNotDone.interpolate({inputRange : [0,100], outputRange : ['0%', '100%']}), ...styles.indicatorBar}}>
            <Text style={{...textColor, ...textStyle}}>{max - current}h</Text>
         </Animated.View>
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