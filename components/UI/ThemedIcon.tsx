import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { StyleSheet, ViewStyle, Animated, TouchableOpacity, Text, Pressable } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
   onPress : () => void,
}

const ThemedIcon = ({darkMode, style, onPress} : Props) => {
   return (
      <Pressable style={{...style}} onPress={onPress}>
         <Ionicons name="ios-close" size={25} color={Colors.red}/>
      </Pressable>
   )
}
const styles = StyleSheet.create({
   buttonText : {
      width: '100%',
      textAlign: 'center'
   }
})

export default ThemedIcon;