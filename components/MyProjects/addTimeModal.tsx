import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
}

const AddTimeModal = ({darkMode} : Props) => {
   const {textColor, backgroundColorMain, textStyle} = Colors.getColors(darkMode)
   return (
      <View>
        
      </View>
   )
}

const styles = StyleSheet.create({
  
})

export default AddTimeModal;