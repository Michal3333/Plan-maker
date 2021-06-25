import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated, Pressable } from 'react-native';
import * as Colors from '../../constants/Colors'

type Props = {
   darkMode: boolean,
   pickIcon: (color: string) => void,
   initialColor? : string | undefined,
   style?: ViewStyle,
}
type Icons = "alert-circle" | 'american-football' | 'ios-briefcase' | 'time-sharp'
const ColorsToPick : Icons[] = ["alert-circle", 'american-football', 'ios-briefcase', 'time-sharp'];
const ColorsPerRow = 4;

const IconPicker = ({darkMode, pickIcon, initialColor, style} : Props) => {
   const {background, border} = Colors.getColors(darkMode)
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode)
   let startingColor = ColorsToPick[0]
   useEffect(() => {
      if(initialColor){
         const initialColorFromArray = ColorsToPick.find(x => x === initialColor);
         if(initialColorFromArray) {
            setPickedColor(initialColorFromArray)
            pickIcon(initialColorFromArray);
         }
      }
   }, [initialColor])
   const [pickedColor, setPickedColor] = useState(startingColor);
   const numberOfRows = Math.ceil(ColorsToPick.length / ColorsPerRow);
   const rows = Array.from(Array(numberOfRows).keys()).map((x, index) => {
      const colorsInThisRow = ColorsToPick.slice(index * ColorsPerRow, (index + 1) * ColorsPerRow)
      const colorosInThisRowBoxes = colorsInThisRow.map(color => {
         return <Pressable key={color} style={{backgroundColor: pickedColor === color ? backgroundDarker: backgroundLighter, ...styles.boxes,}} onPress={() => {
            setPickedColor(color);
            pickIcon(color)
         }}>
            <Ionicons name={color} size={24} color={'white'}/>
         </Pressable>
      })
      return (
         <View key={index} style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
            {colorosInThisRowBoxes}
         </View>
      )
   })
   return (
      <View style={{...styles.indicator, ...background, ...style}}>
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
      paddingVertical: 5,
      maxWidth: 400,
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

export default IconPicker;