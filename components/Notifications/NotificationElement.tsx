import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'
import { NOTIFICATION_TYPE } from '../../API/collections';

type Props = {
   id: string,
   sender: string,
   text: string,
   type: NOTIFICATION_TYPE,
   delete: () => void,

}

const NotificationElement = (props : Props) => {
   return (
      <View style={styles.box}>
         <Text>{props.text}</Text>
         <Text>{props.type}</Text>
         <Text>{props.sender}</Text>
         <View style={styles.buttonsBox}>
            <Button title="Delete" onPress={props.delete}/>
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

export default NotificationElement;