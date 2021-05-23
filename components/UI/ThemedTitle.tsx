import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated, TextStyle } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   children: React.ReactNode,
   style?: TextStyle,
}

const ThemedTitle = ({darkMode, children, style} : Props) => {
   const {textColor, titleHeaderStyle} = Colors.getColors(darkMode)
   return (
      <Text style={{...textColor, ...titleHeaderStyle, ...style}}>
         {children}
      </Text>
   )
}


export default ThemedTitle;