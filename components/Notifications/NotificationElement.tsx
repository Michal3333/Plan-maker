import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'
import { NOTIFICATION_TYPE } from '../../API/collections';
import * as Colors from '../../constants/Colors'
import Card from '../UI/Card';
import ThemedText from '../UI/ThemdText';
import ThemedButton from '../UI/ThemedButton';
import ThemedIcon from '../UI/ThemedIcon';
import ThemedLabel from '../UI/ThemedLabel';

type Props = {
   id: string,
   sender: string,
   text: string,
   type: NOTIFICATION_TYPE,
   delete: () => void,
   darkMode : boolean,

}

const NotificationElement = (props : Props) => {
   const {background} = Colors.getColors(props.darkMode)
   return (
      <Card style={{...styles.box}} darkMode={props.darkMode}>
         <View style={{width: '92%'}}>
            <ThemedLabel  darkMode={props.darkMode}>{props.text}</ThemedLabel>
            <ThemedText style={{...styles.marginLeft}}  darkMode={props.darkMode}>From: {props.sender}</ThemedText>
         </View>
         <ThemedIcon  darkMode={props.darkMode}  onPress={props.delete} style={{}}/>
      </Card>
   )
}

const styles = StyleSheet.create({
   box: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around"
   },
   marginLeft: {
      marginTop: 5,
      marginLeft: 10
   }
})

export default NotificationElement;