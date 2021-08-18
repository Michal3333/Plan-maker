import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons'
import { useColorScheme } from 'react-native';
import * as Colors from '../../constants/Colors'

 
type Props = {
   size? :number
}

const CustomHeaderButton = (props: Props) => {
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   const {iconColor} = Colors.getColorsForNavigator(darkMode);
   return (
      <HeaderButton title="icom" color={iconColor} IconComponent={Ionicons} iconSize={35} {...props}/>
   )
}



export default CustomHeaderButton;