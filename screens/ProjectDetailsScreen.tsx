import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { createContributorInvitation } from '../API/notifications';
import Screen from '../components/UI/Screen';
import NotificationOut, { NotificationType } from '../models/NotificationOut';
import { MyProjectDetailsRouteProp } from '../navigation/navigationTypes';
import { useAppSelector } from '../store/store'


type Props = {
   route: MyProjectDetailsRouteProp
}

const ProjectDetailsScreen = (props: Props) => {
   const [email, setEmail] = useState('');
   const user = useAppSelector(state => state.user)
   const id = props.route.params.id
   const sendContributorInvitation = async () => {
      const notification = new NotificationOut('', NotificationType.request, user.email, email, id)
      createContributorInvitation(notification, email, user.id);
   }
   return (
      <Screen>
         <Text>{id}</Text>
         <TextInput style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
         <Button title="Add Contributor" onPress={sendContributorInvitation}/>
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
   }
})

export default ProjectDetailsScreen;