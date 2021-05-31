import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'
import ThemedText from '../UI/ThemdText';
import ThemedIcon from '../UI/ThemedIcon';

type Props = {
   darkMode: boolean,
   style?: ViewStyle,
}

const TaskComponent = ({darkMode, style,} : Props) => {
   const {textColor, backgroundColorMain, textStyle} = Colors.getColors(darkMode)
   return (
      <View style={styles.taskBox}>
         <ThemedText darkMode={darkMode} style={{width: '80%'}}>Dodaj ekran szcegolow</ThemedText>
         <ThemedIcon  darkMode={darkMode}  onPress={() => {
            
         }} style={{}} icon='md-checkmark-circle' type="accept"/>
      </View>
   )
}

const styles = StyleSheet.create({
  taskBox : {
     flexDirection: 'row',
     alignItems: 'center',
     width: '100%',
     borderBottomColor: 'black',
     borderBottomWidth: 3
  }
})

export default TaskComponent;