import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, FlatList } from 'react-native'
import Contributor from '../../models/Contributor';
import Screen from '../UI/Screen';


type Props = {
   addConributor: (email: string) => void,
   closeModel: () => void,
   contributors : Contributor[]
}

const ContributorsModal = (props : Props) => {
   const [email, setEmail] = useState('');
   

   return (
      <Screen style={styles.modal}>
         <Text>email</Text>
         <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
         <View>
            <Button title="Add" onPress={() => props.addConributor(email)}/>
            <Button title="Cancel" onPress={props.closeModel}/>
         </View>
         <FlatList data={props.contributors} renderItem={(itemData) => <Text>{itemData.item.contributorMail}</Text>}/>
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