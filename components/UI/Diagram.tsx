import React from 'react'
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import { timeLog } from '../../API/userData';
import * as Colors from '../../constants/Colors'
import Card from './Card';
import ThemedText from './ThemdText';
import ThemedLabel from './ThemedLabel';

type DiagramData = {
   value: number,
   title: string
}

type Props = {
   darkMode: boolean,
   data: DiagramData[],
   heigth: number,
   max? : number
}

const Diagram = ({darkMode, data, heigth, max} : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode);
   const selectedMax = max ? max : data.reduce((prev, current) => {
      if(current.value > prev) return current.value;
      return prev;
   }, 0)
   var bars = data.map(x => {
      let barHeigth = x.value !== -1 ?  (x.value / selectedMax) * 100 -15 + '%' : '50%';
      if( x.value === 0) barHeigth = '1%'
      return (
         <View  key={x.title} style={{flexGrow: 1, justifyContent: 'flex-end', height: '100%', marginHorizontal: 5}}>
            <View style={{width: '100%', justifyContent: 'center', marginBottom: 5}}>
               <ThemedText style={{width: 40, textAlign: 'center'}} darkMode={darkMode}>{x.value !== -1 ? x.value : ''}</ThemedText>
            </View>
            <View style={{height: barHeigth, ...styles.barStyle, justifyContent: 'center', alignItems: 'center',
               backgroundColor: x.value !== -1 ? Colors.primary : backgroundDarker}}>
               <ThemedText darkMode={darkMode}>{x.value == -1 && '?'}</ThemedText>
            </View>
            <View style={{width: '100%', justifyContent: 'center', marginTop: 5}}>
               <ThemedText style={{width: 40, textAlign: 'center'}} darkMode={darkMode}>{x.title}</ThemedText>
            </View>
         </View>
      )
   })
   return (
      <Card darkMode={darkMode} style={{width: '100%', height: heigth, padding: 10}}>
         <ThemedLabel style={{fontSize: 40, width: '100%', height: '20%'}} darkMode={darkMode}>Weekly times</ThemedLabel>
         <View style={styles.diagram}>
            {bars}
         </View>
      </Card>
   )
}

const styles = StyleSheet.create({
   diagram: {
      flexDirection: 'row',
      height: '80%',
      width: '100%',
   },
   barStyle: {
      width: '100%', 
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      justifyContent: 'space-evenly'
   }
})

export default Diagram;