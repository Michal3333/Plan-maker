import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'
import ColorPicker from '../UI/ColorPicker';

type Props = {
   addProject: (name: string, weeklyLimit: string, dueDate: string) => void,
   closeModel: () => void,
   darkMode : boolean
}

const NewProjectModal = (props : Props) => {
   const [name, setName] = useState('')
   const [weeklyLimit, setWeeklyLimit] = useState('')
   // const [color, setColor] = useState(1)
   const [dueDate, setDueDate] = useState('2022-03-03')

   return (
      <View style={styles.modal}>
         <Text>Name</Text>
         <TextInput style={styles.input} onChangeText={(text) => setName(text)} value={name} />
         <Text>Due Date</Text>
         <TextInput style={styles.input} onChangeText={(text) => setDueDate(text)} value={dueDate} />
         <Text>Weeky Limit</Text>
         <TextInput style={styles.input} onChangeText={(text) => setWeeklyLimit(text)} value={weeklyLimit.toString()} keyboardType='number-pad'/>
         <ColorPicker darkMode={props.darkMode}/>
         <View>
            <Button title="Add" onPress={() => props.addProject(name, weeklyLimit, dueDate)}/>
            <Button title="Cancel" onPress={props.closeModel}/>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '80%',
      marginBottom: 20
   },
   modal: {
      alignItems: 'center',
      padding: 10,
      height: '100%',
      backgroundColor: 'black'
   }
})

export default NewProjectModal;