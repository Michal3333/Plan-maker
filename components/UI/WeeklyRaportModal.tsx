import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Colors from '../../constants/Colors'
import { validateTaskName } from '../../utils/validators';
import ThemedButton from './ThemedButton';
import ThemedInput from './ThemedInput';
import ThemedLabel from './ThemedLabel';
import ProgressIndicator from './ProgressIndicator';


type RaportItem = {
   name: string,
   goal: number,
   done: number,
   color: string
}

type Props = {
   darkMode: boolean,
   data: RaportItem[],
   closeModal: () => void
}

const WeeklyRaportModal = ({darkMode, data, closeModal} : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode);

   const result = data.reduce((prev, cur) => {
      if(cur.done < cur.goal) prev = 'Not bad, keep going'
      return prev
   }, 'Perfect, keep going')

   const finalTextHeight = useRef(new Animated.Value(0)).current;
   const finalTextOpacity = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      const delay = (data.length + 2) * 300
      Animated.timing(finalTextHeight, {
         toValue: 130,
         duration: 300,
         delay: delay,
         useNativeDriver: false
      }).start();
      Animated.timing(finalTextOpacity, {
         toValue: 1,
         duration: 500,
         delay: delay + 200,
         useNativeDriver: false
      }).start();
   }, [])

   const progresIndicators = data.map((x, index) => {
      return <View key={x.name} style={{marginTop: 10}}>
         <ThemedLabel style={{}} darkMode={darkMode}>{x.name}</ThemedLabel>
         <ProgressIndicator darkMode={darkMode} color={x.color} current={x.done} max={x.goal} delayAnimation={(index + 1) * 300}/>
      </View>
   })


   return (
      <View style={{...styles.centeredView, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
         <View style={{backgroundColor: backgroundLighter, borderRadius: 20, ...styles.contentBox}}>
            <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Weekly Raport</ThemedLabel>
            <View>
               {progresIndicators}
            </View>
            <Animated.View style={{backgroundColor:backgroundDarker, ...styles.finalText, height: finalTextHeight}}>
               <Animated.View style={{opacity: finalTextOpacity}}>
                  <ThemedLabel style={{fontSize: 30}} darkMode={darkMode}>{result}</ThemedLabel>

               </Animated.View>
            </Animated.View>
            <View style={styles.buttonsBox}>
               <ThemedButton title="Close" 
                  darkMode={darkMode} 
                  disabled={false} 
                  onPress={closeModal}
                  type="confirm" 
                  style={{ width: "40%",  paddingVertical: 10}}/>
            </View>
         </View>
      </View>
     
     
   )
}

const styles = StyleSheet.create({
   text: {
      textAlign: 'left',
      width: "100%",
      fontSize: 40,
      marginVertical: 20
      
   },
   contentBox: {
      alignItems: 'center',
      width: '90%',
      paddingHorizontal: 20
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      // marginTop: 20,
      maxWidth: 400,
      marginBottom: 20,
      marginTop: 20
   },
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    finalText : {
       width: '100%', 
       borderRadius: 20, 
       marginTop: 20,
       alignItems: 'center',
       justifyContent: 'center'

    }
})

export default WeeklyRaportModal;