import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { StyleSheet, ViewStyle, Animated, TouchableOpacity, Text, Pressable } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
   onPress : () => void,
   icon : 'ios-close' | 'chevron-down-circle' | 'chevron-up-circle' | 'md-checkmark-circle',
   type?: 'delete' | 'accept'
}

const ThemedIcon = ({darkMode, style, onPress, icon, type} : Props) => {
   let {iconColor} = Colors.getColorsForNavigator(darkMode);
   if(type === 'delete') iconColor = Colors.red;
   if(type === 'accept') iconColor = Colors.green;
   return (
      <Pressable style={{...style, padding: 10, margin:10}} onPress={onPress}>
         <Ionicons name={icon} size={25} color={iconColor}/>
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