import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated, Pressable } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
}

const ColorsToPick = ["#16BAC5", '#5FBFF9', '#00A676', '#F0C808', '#DD1C1A', '#FF8600', '#A3333D', '#202C59'];
const ColorsPerRow = 4;

const ColorPicker = ({darkMode} : Props) => {
   const {background, border} = Colors.getColors(darkMode)
   const {colorPickerCheckColor} = Colors.getColorsForNavigator(darkMode)
   const [pickedColor, setPickedColor] = useState('');
   console.log(colorPickerCheckColor)
   const numberOfRows = Math.ceil(ColorsToPick.length / ColorsPerRow);
   const rows = Array.from(Array(numberOfRows).keys()).map((x, index) => {
      const colorsInThisRow = ColorsToPick.slice(index * ColorsPerRow, (index + 1) * ColorsPerRow)
      const colorosInThisRowBoxes = colorsInThisRow.map(color => {
         return <Pressable key={color} style={{backgroundColor: color, ...styles.boxes,}} onPress={() => {
            setPickedColor(color);
         }}>
            {pickedColor === color && <Ionicons name="md-checkmark-circle" size={24} color={colorPickerCheckColor}/>}
         </Pressable>
      })
      return (
         <View key={index} style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
            {colorosInThisRowBoxes}
         </View>
      )
   })
   return (
      <View style={{...styles.indicator, ...background}}>
        {
           rows
        }
      </View>
   )
}

const styles = StyleSheet.create({
   indicator: {
      width: '100%',
      borderRadius: 20,
      paddingVertical: 20
   },
   boxes: {
      width: 45, 
      height: 45,
      marginVertical: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
   }

})

export default ColorPicker;