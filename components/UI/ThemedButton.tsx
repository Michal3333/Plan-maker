import React, {useState} from 'react';
import { StyleSheet, ViewStyle, Animated, TouchableOpacity, Text, Pressable } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
   onPress : () => void,
   disabled : boolean
   title: string,
   type: 'confirm' | 'normal',
   colorText? : 'reject' | 'accept'
}

const ThemedButton = ({darkMode, style, title, disabled, onPress, type, colorText} : Props) => {
   const {buttonColor, buttonColorDisabled, buttonTextStyle, buttonTextStyleConfirm, buttonStyle} = Colors.getColors(darkMode);
   const color = disabled ? buttonColorDisabled : buttonColor;
   const styleToType = type === "confirm" ? buttonTextStyleConfirm : buttonTextStyle;
   if(colorText === 'reject' && !disabled ) {
      color.color = Colors.red;
   } else if (colorText === 'accept' && !disabled) {
      color.color = Colors.green;
   }
   return (
      <Pressable style={{...buttonStyle, ...style}} onPress={() => {
         if(!disabled) {
            onPress()
         }
      }}>
         <Text style={{...color,...styles.buttonText, ...styleToType}}>{title}</Text>
      </Pressable>
   )
}
const styles = StyleSheet.create({
   buttonText : {
      width: '100%',
      textAlign: 'center'
   }
})

export default ThemedButton;