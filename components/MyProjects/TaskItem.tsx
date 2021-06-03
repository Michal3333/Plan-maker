import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, Switch, Animated } from 'react-native'
import Card from '../UI/Card';
import ThemedText from '../UI/ThemdText';
import ThemedLabel from '../UI/ThemedLabel';
import ThemedButton from '../UI/ThemedButton';
import * as Colors from '../../constants/Colors'
import ThemedIcon from '../UI/ThemedIcon';

type Props = {
   text: string
   style? : ViewStyle,
   darkMode: boolean,
   editMode: boolean,
   color: string,
   done: boolean,
   deleteTask : () => void
   changeDone : () => void,
   disabled? : boolean
}

const TaskItem = ({text, style, darkMode, editMode, color, deleteTask, done, changeDone, disabled=false} : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode)

   const widthDelete = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      if(editMode){
         Animated.timing(widthDelete, {
            toValue: 100,
            duration: 500,
            useNativeDriver: false
         }).start();
      } else {
         Animated.timing(widthDelete, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
         }).start();
      }
   }, [editMode])


   return (
     <View style={{...styles.item, backgroundColor: backgroundDarker, ...style}}>
         <Switch style={{transform: [{ scaleX: .8 }, { scaleY: .8 }], marginRight: 3}}
            value={done}
            onValueChange={changeDone}
            disabled={disabled}
            trackColor={{ false: backgroundLighter, true: color }}/>
         <ThemedLabel darkMode={darkMode} style={{width: '70%'}}>{text}</ThemedLabel>
         <Animated.View style={{width : widthDelete.interpolate({inputRange: [0, 100], outputRange: ["0%", "15%"]})}}>
            <ThemedIcon  darkMode={darkMode}  onPress={deleteTask} style={{padding: 2, margin: 0}} size={30} icon='ios-close' type='delete'/>
         </Animated.View>

     </View>
   )
}

const styles = StyleSheet.create({
   item: {
      marginBottom: 5,
      flexDirection: 'row',
      width: '100%',
      padding : 5,
      borderRadius: 15,
      alignItems: 'center'
   }
})

export default TaskItem;