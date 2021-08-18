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
   logs: timeLog[],
   withLegend? : boolean
}

type calendarColumnArray = day []
type day = {
   day: number,
   color: string,
}
type colorInterval = {
   max: number,
   min: number,
   color: string,
   text? : string
}

const colorIntervals : colorInterval[] = [
   {
      min: 1,
      max: 3,
      color: Colors.green_1
   },
   {
      min: 4,
      max: 6,
      color: Colors.green_2
   },
   {
      min: 7,
      max: 10,
      color: Colors.green_3
   },
   {
      min: 11,
      max: 1000,
      color: Colors.green_4,
      text: '11+'
   }
]

const getGreenColor = (time: number) => {
   const colInt = colorIntervals.find(x => x.min <= time && x.max >= time);
   if(colInt){
      return colInt.color;
   }
   return ''
}

const Calendar = ({darkMode, style, logs, withLegend} : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode)

   const today = new Date();
   const numberOfDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
   let days = Array.from(Array(numberOfDays).keys()).map(x => {
      return {
         day: x + 1,
         color: backgroundLighter
      }
   })
   // const daysToMove = new Date(today.getFullYear(), today.getMonth(), 1).getDay() + 1;
   // console.log(daysToMove)
   // const test = []
   // for(let i = 1; i <= daysToMove; i++){
   //    test.push({
   //       day: i * -1,
   //       color: backgroundLighter
   //    })
   // }
   // days = [...test, ...days]

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
      let arr = (curr.day - 1) % 7;
      prev[arr].push(curr)
      return prev;
   }, init)

   const columns = columnsData.map((x, index) => {
      return (
         <View key={index} style={{justifyContent: 'flex-start'}}>
            {
               x.map((day, index) => {
                  return (
                     <View key={day.day} style={{width: 40, alignItems: 'center', paddingVertical: 10, backgroundColor: day.color, marginVertical: 3, borderRadius: 20}}>
                        <ThemedText darkMode={darkMode}>{day.day}</ThemedText>
                     </View>
      
                  )
               })
            }
         </View>
      )
   })

   let legend;
   if(withLegend){
      legend = colorIntervals.map(x => {
         return (
            <View key={x.color} style={{flexDirection: 'row', alignItems:'center'}}>
               <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: x.color, marginRight: 5}}/>
               <ThemedText darkMode={darkMode}>{x.text ? x.text : `${x.min}-${x.max}`}</ThemedText>
            </View>
         )
      })
   }


   return (
      <Card darkMode={darkMode} style={{...style, width: '100%',}}>
         <View style={styles.projectName} >
            <ThemedLabel style={{fontSize: 40, width: '70%'}} darkMode={darkMode}>Calendar</ThemedLabel>
         </View>
         <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
         {
            columns
         }
         </View>
         {withLegend && <View style={{flexDirection:'row', width: '100%', justifyContent:'space-evenly', marginTop: 5}}>
            {legend}
         </View>}
         
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