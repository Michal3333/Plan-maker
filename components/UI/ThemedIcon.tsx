import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { StyleSheet, ViewStyle, Animated, TouchableOpacity, Text, Pressable } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
   onPress : () => void,
   icon : 'ios-close' | 'chevron-down-circle' | 'chevron-up-circle' | 'md-checkmark-circle' | 'ios-add' | 'pencil' |'ios-trash',
   type?: 'delete' | 'accept',
   color? :string,
   size? : number

}

const ThemedIcon = ({darkMode, style, onPress, icon, type, color, size = 25} : Props) => {
   let {iconColor} = Colors.getColorsForNavigator(darkMode);
   if(type === 'delete') iconColor = Colors.red;
   if(type === 'accept') iconColor = Colors.green;
   if(color) iconColor = color
   return (
      <TouchableOpacity style={{ padding: 10, margin:10, alignItems: 'center', ...style}} onPress={onPress}>
         <Ionicons name={icon} size={size} color={iconColor}/>
      </TouchableOpacity>
   )
}
const styles = StyleSheet.create({
})

export default ThemedIcon;