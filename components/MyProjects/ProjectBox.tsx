import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Animated } from 'react-native'
import Card from '../UI/Card';
import ProgressIndicator from '../UI/ProgressIndicator';
import ThemedText from '../UI/ThemdText';
import ThemedButton from '../UI/ThemedButton';
import ThemedLabel from '../UI/ThemedLabel';
import ThemedTitle from '../UI/ThemedTitle';
import TaskComponent from './TaskComponent';
import * as Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';


type Props = {
   id: string,
   name: string,
   openDetails: () => void,
   darkMode: boolean,
   goal : number,
   done: number,
   color: string,
   openAddTimeModal: () => void,
   total: number,
   icon: string
}

const ProjectBox = (props : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(props.darkMode)
   const animatedOpacity = useRef(new Animated.Value(0)).current;
   useEffect(() => {
      Animated.timing(animatedOpacity, {
         toValue: 1,
         duration: 300,
         useNativeDriver: false
      }).start();
   }, [])

   return (
      <Animated.View style={{opacity: animatedOpacity}}>
         <Card darkMode={props.darkMode}>
            <View style={styles.projectName} >
               <ThemedLabel style={{fontSize: 40, width: '70%'}} darkMode={props.darkMode}>{props.name}</ThemedLabel>
               {
                  props.icon && ( props.icon === "alert-circle" || props.icon === 'american-football' || props.icon === 'ios-briefcase' || props.icon === 'time-sharp')  && <View style={{backgroundColor: backgroundDarker, padding: 10, borderRadius: 10}}>
                     <Ionicons name={props.icon} size={24} color={props.color}/>
                  </View> 
               }
               
            </View>
            <ProgressIndicator darkMode={props.darkMode} max={props.goal} current={props.done} color={props.color} style={{marginTop: 10}}/>
            <View style={styles.scoreBox}>
               <View style={{...styles.scoreSqare, backgroundColor: backgroundDarker, marginRight: 20 }}>
                  <ThemedText darkMode={props.darkMode}>Total hours</ThemedText>
                  <ThemedLabel darkMode={props.darkMode} style={{color: props.color, fontSize: 60}}>{props.total}</ThemedLabel>
               </View>
            
               <View style={{...styles.scoreSqare, backgroundColor: props.color}}>
                  <ThemedText darkMode={props.darkMode} style={{color: 'white'}}>Complited Weeks</ThemedText>
                  <ThemedLabel darkMode={props.darkMode} style={{color: 'white', fontSize: 60}}>0</ThemedLabel>
               </View>
            </View>
            <View style={styles.buttonsBox}>
               <ThemedButton title="Add time" 
                  darkMode={props.darkMode} 
                  disabled={false} 
                  onPress={() => {props.openAddTimeModal()}}
                  type="confirm" 
                  style={{ width: "48%"}}/>
               <ThemedButton title="Details" 
                  darkMode={props.darkMode} 
                  disabled={false} 
                  onPress={props.openDetails}
                  type="confirm" 
                  style={{width: "48%"}}/>
            </View>
         </Card>
      </Animated.View>
      

   )
}

const styles = StyleSheet.create({
   projectName: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   scoreBox: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20
   },
   scoreSqare: {
      alignItems: 'center',
      // width: '30%',
      flex: 1,
      borderRadius: 10,
      paddingTop: 15
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      maxWidth: 400,
      marginBottom: 10
   },

  
})

export default ProjectBox;