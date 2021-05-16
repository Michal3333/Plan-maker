import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   children: React.ReactNode,
   style?: ViewStyle,
}

const ThemedText = ({darkMode, children, style} : Props) => {
   const {textColor} = Colors.getColors(darkMode)
   return (
      <Text style={{...textColor, ...style}}>
         {children}
      </Text>
   )
}

const style = StyleSheet.create({

})

export default ThemedText;