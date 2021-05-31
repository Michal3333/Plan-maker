import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TextStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   children: React.ReactNode,
   style?: TextStyle,
}

const ThemedText = ({darkMode, children, style} : Props) => {
   const {textColor, textStyle} = Colors.getColors(darkMode)
   return (
      <Text style={{...textColor, ...textStyle, ...style}}>
         {children}
      </Text>
   )
}

const style = StyleSheet.create({

})

export default ThemedText;