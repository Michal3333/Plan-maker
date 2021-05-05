import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'

type Props = {
   id: string,
   projectName: string,
   ownerEmail: string,
   sendAnswer: (answer: boolean) => void
}

const InvitationElement = (props : Props) => {
   return (
      <View style={styles.box}>
         <Text>{props.projectName}</Text>
         <Text>{props.ownerEmail}</Text>
         <View style={styles.buttonsBox}>
            <Button title="Accept" onPress={() => props.sendAnswer(true)}/>
            <Button title="Reject"onPress={() => props.sendAnswer(false)}/>
         </View>
      </View>
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
      justifyContent: "space-around"
   }
})

export default InvitationElement;