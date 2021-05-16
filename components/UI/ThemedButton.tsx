import React, {useState} from 'react';
import { StyleSheet, ViewStyle, Animated, TouchableOpacity, Text } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
   onPress : () => void,
   disabled : boolean
   title: string,
   type: 'confirm' | 'normal'
}

const ThemedButton = ({darkMode, style, title, disabled, onPress, type} : Props) => {
   const {buttonColor, buttonColorDisabled, buttonStyle, buttonStyleConfirm} = Colors.getColors(darkMode);
   const color = disabled ? buttonColorDisabled : buttonColor;
   const styleToType = type === "confirm" ? buttonStyleConfirm : buttonStyle;
   return (
      <TouchableOpacity style={{...style}} onPress={() => {
         if(!disabled) {
            onPress()
         }
      }}>
         <Text style={{...color, ...styleToType}}>{title}</Text>
      </TouchableOpacity>
   )
}


export default ThemedButton;