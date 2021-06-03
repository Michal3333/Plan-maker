import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'
import Card from './Card';

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
}

type calendarColumnArray = day []
type day = {
   day: number,
   color: string
}

const Calendar = ({darkMode, style} : Props) => {
   const {textColor, backgroundColorMain, textStyle} = Colors.getColors(darkMode)

   const today = new Date();
   const numberOfDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
   const days = Array.from(Array(numberOfDays).keys()).map(x => {
      return {
         day: x + 1,
         color: 'green'
      }
   })
   const init : calendarColumnArray[] = [[], [], [], [], [], [], []] 
   const columnsData = days.reduce((prev, curr) => {
      const arr = (curr.day - 1) % 7;
      prev[arr].push(curr)
      return prev;
   }, init)
   // const rows = Array.from(Array(numberOfRows).keys()).map((x, index) => {
   //    const daysInRow = days.slice(index * 7, (index + 1) * 7);
   //    const dayBoxes = daysInRow.map(day => {
   //       return <View key={day} style={{width: 40, alignItems: 'center', paddingVertical: 10, backgroundColor: Colors.green, marginVertical: 10, borderRadius: 20}}>
   //          <Text style={{color: 'white'}}>{day}</Text>
   //       </View>
   //    })
   //    return <View  key={index} style={{justifyContent: 'space-evenly', flexDirection: 'row', width: '100%'}}>
   //       {
   //          dayBoxes
   //       }
   //    </View>

   const columns = columnsData.map((x, index) => {
      return (
         <View key={index} style={{justifyContent: 'flex-start'}}>
            {
               x.map((day, index) => {
                  return (
                     <View key={day.day} style={{width: 40, alignItems: 'center', paddingVertical: 10, backgroundColor: day.color, marginVertical: 10, borderRadius: 20}}>
                        <Text style={{color: 'white'}}>{day.day}</Text>
                     </View>
      
                  )
               })
            }
         </View>
      )
   })

   // })
   return (
      <Card darkMode={darkMode} style={{...style, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
         {
            columns
         }
      </Card>
   )
}

const styles = StyleSheet.create({
   indicator: {
      width: '100%',
      height: 35,
      borderRadius: 20,
      flexDirection: 'row'
   },
   indicatorBar: {
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center',
   }
})

export default Calendar;