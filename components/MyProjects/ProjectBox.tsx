import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'
import Card from '../UI/Card';
import ThemedLabel from '../UI/ThemedLabel';

type Props = {
   id: string,
   name: string,
   openDetails: () => void,
   darkMode: boolean
}

const ProjectBox = (props : Props) => {
   return (
      <Card darkMode={props.darkMode}>
         <View style={styles.projectName} >
            <ThemedLabel  darkMode={props.darkMode}>{props.name}</ThemedLabel>
         </View>
         
         <View>
            <Button title="Details" onPress={props.openDetails}/>
         </View>
      </Card>

   )
}

const styles = StyleSheet.create({
   projectName: {
      width: '100%'
   }
})

export default ProjectBox;