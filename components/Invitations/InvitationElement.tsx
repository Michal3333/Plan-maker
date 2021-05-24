import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'
import Card from '../UI/Card';
import ThemedText from '../UI/ThemdText';
import ThemedLabel from '../UI/ThemedLabel';
import ThemedButton from '../UI/ThemedButton';

type Props = {
   id: string,
   projectName: string,
   ownerEmail: string,
   sendAnswer: (answer: boolean) => void,
   darkMode : boolean,
}

const InvitationElement = (props : Props) => {
   return (
      <Card darkMode={props.darkMode}>
         <View style={styles.textBox}>
            <ThemedLabel darkMode={props.darkMode}>Project name : {props.projectName}</ThemedLabel>
            <View style={{marginTop: 5}}>
               <ThemedText darkMode={props.darkMode}>Owner : {props.ownerEmail}</ThemedText>
            </View>
           
         </View>
         <View style={styles.buttonsBox}>
            <ThemedButton title="Accept" 
               darkMode={props.darkMode} 
               disabled={false} 
               onPress={() => props.sendAnswer(true)}
               type="confirm" 
               style={{width: "40%"}}
               colorText="accept"/>
            <ThemedButton title="Reject" 
               darkMode={props.darkMode} 
               disabled={false} 
               onPress={() => props.sendAnswer(false)}
               type="confirm" 
               style={{ width: "40%"}}
               colorText="reject"/>
         </View>
      </Card>
   )
}

const styles = StyleSheet.create({
   box: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center'
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20
   },
   textBox: {
      width: '100%'
   }
})

export default InvitationElement;