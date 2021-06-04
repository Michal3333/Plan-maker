import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import { timeLog } from '../../API/userData';
import * as Colors from '../../constants/Colors'
import Card from './Card';
import ThemedText from './ThemdText';
import ThemedLabel from './ThemedLabel';

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
   logs: timeLog[]
}

type calendarColumnArray = day []
type day = {
   day: number,
   color: string,
}

const getGreenColor = (time: number) => {
   if(time === 0){
      return ''
   } else if (time > 10){
      return Colors.green_4;
   } else if (time > 6){
      return Colors.green_3;
   } else if (time > 3){
      return Colors.green_2;
   } else {
      return Colors.green_1
   }
}

const Calendar = ({darkMode, style, logs} : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode)


   const today = new Date();
   const numberOfDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
   const days = Array.from(Array(numberOfDays).keys()).map(x => {
      return {
         day: x + 1,
         color: backgroundLighter
      }
   })
   const daysWithColors = days.map(day => {
      const hours = logs.reduce((amount, cur) => {
         if(cur.date.getDate() === day.day){
            amount += cur.time;
         }
         return amount;
      }, 0)
      const pickedColor = getGreenColor(hours);
      if(pickedColor) {
         day.color = pickedColor
      }
      return day
   })
   const init : calendarColumnArray[] = [[], [], [], [], [], [], []] 
   const columnsData = daysWithColors.reduce((prev, curr) => {
      const arr = (curr.day - 1) % 7;
      prev[arr].push(curr)
      return prev;
   }, init)

   const columns = columnsData.map((x, index) => {
      return (
         <View key={index} style={{justifyContent: 'flex-start'}}>
            {
               x.map((day, index) => {
                  return (
                     <View key={day.day} style={{width: 40, alignItems: 'center', paddingVertical: 10, backgroundColor: day.color, marginVertical: 10, borderRadius: 20}}>
                        {/* <Text style={{color: 'white'}}>{day.day}</Text> */}
                        <ThemedText darkMode={darkMode}>{day.day}</ThemedText>
                     </View>
      
                  )
               })
            }
         </View>
      )
   })

   // })
   return (
      <Card darkMode={darkMode} style={{...style, width: '100%'}}>
         <View style={styles.projectName} >
            <ThemedLabel style={{fontSize: 40, width: '70%'}} darkMode={darkMode}>Calendar</ThemedLabel>
         </View>
         <View style={{...style, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
         {
            columns
         }
         </View>
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
   },
   projectName: {
      width: '100%'
   },
})

export default Calendar;