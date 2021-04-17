import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'

type Props = {
   id: string,
   name: string,
   openDetails: () => void
}

const ProjectBox = (props : Props) => {
   return (
      <View style={styles.box}>
         <Text>{props.id}</Text>
         <Text>{props.name}</Text>
         <View>
            <Button title="Details" onPress={props.openDetails}/>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   box: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center'
   }
})

export default ProjectBox;