import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'
import Card from '../UI/Card';
import ProgressIndicator from '../UI/ProgressIndicator';
import ThemedLabel from '../UI/ThemedLabel';

type Props = {
   id: string,
   name: string,
   openDetails: () => void,
   darkMode: boolean,
   goal : number,
   done: number,
   color: string,
}

const ProjectBox = (props : Props) => {
   const percent = 0.6;
   return (
      <Card darkMode={props.darkMode}>
         <View style={styles.projectName} >
            <ThemedLabel  darkMode={props.darkMode}>{props.name}</ThemedLabel>
         </View>
         <ProgressIndicator darkMode={props.darkMode} max={props.goal} current={props.done} color={props.color}/>
         
         <View>
            <Button title="Details" onPress={props.openDetails}/>
         </View>
      </Card>

   )
}

const styles = StyleSheet.create({
   projectName: {
      width: '100%'
   },
  
})

export default ProjectBox;