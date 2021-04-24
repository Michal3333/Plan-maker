import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native'

type Props = {
   addProject: (name: string, weeklyLimit: number, dueDate: string) => void,
   closeModel: () => void
}

const NewProjectModal = (props : Props) => {
   const [name, setName] = useState('')
   const [weeklyLimit, setWeeklyLimit] = useState(0)
   // const [color, setColor] = useState(1)
   const [dueDate, setDueDate] = useState('')

   return (
      <View>
         <Text>Name</Text>
         <TextInput style={styles.input} onChangeText={(text) => setName(text)} value={name} />
         <Text>Due Date</Text>
         <TextInput style={styles.input} onChangeText={(text) => setDueDate(text)} value={dueDate} />
         <Text>Weeky Limit</Text>
         <TextInput style={styles.input} onChangeText={(text) => setWeeklyLimit(parseInt(text))} value={weeklyLimit.toFixed(0)} keyboardType='number-pad'/>
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
   }
})

export default NewProjectModal;