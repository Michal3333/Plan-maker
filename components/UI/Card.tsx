import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   children: React.ReactNode,
   style?: ViewStyle,
}

const Card = ({darkMode, children, style} : Props) => {
   const {background, cardStyle} = Colors.getColors(darkMode)
   return (
      <View style={{...background, ...cardStyle, ...styles.card, ...style}}>
         {children}
      </View>
   )
}

const styles = StyleSheet.create({
   card: {
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 20,
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
      borderRadius: 20,
   }
})

export default Card;