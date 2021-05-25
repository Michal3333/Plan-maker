import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, FlatList } from 'react-native'
import Contributor from '../../models/Contributor';
import Screen from '../UI/Screen';


type Props = {
   addConributor: (email: string) => void,
   closeModel: () => void,
   contributors : Contributor[],
   deleteContributor: (contributorId: string) => void  
}

const ContributorsModal = (props : Props) => {
   const [email, setEmail] = useState('');
   

   return (
      <Screen style={styles.modal} darkMode={false}>
         <Text>email</Text>
         <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
         <View>
            <Button title="Add" onPress={() => props.addConributor(email)}/>
            <Button title="Cancel" onPress={props.closeModel}/>
         </View>
         <FlatList data={props.contributors} renderItem={(itemData) => <View>
               <Text>{itemData.item.contributorMail}</Text>
               <Button title="delete" onPress={() => {props.deleteContributor(itemData.item.id)}}/>
            </View>}/>
      </Screen>
      
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
      padding: 10
   }
})

export default ContributorsModal;