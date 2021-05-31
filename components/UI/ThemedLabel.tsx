import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TextStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   children: React.ReactNode,
   style?: TextStyle,
}

const ThemedLabel = ({darkMode, children, style} : Props) => {
   const {textColor, labelStyle} = Colors.getColors(darkMode)
   return (
      <Text style={{...textColor, ...labelStyle, ...style}}>
         {children}
      </Text>
   )
}


export default ThemedLabel;