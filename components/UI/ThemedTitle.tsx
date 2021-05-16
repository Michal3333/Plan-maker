import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   children: React.ReactNode,
   style?: ViewStyle,
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