import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { useDispatch } from 'react-redux';
import { createContributorInvitation } from '../API/notifications';
import Screen from '../components/UI/Screen';
import NotificationOut, { NotificationType } from '../models/NotificationOut';
import { MyProjectDetailsNavigationProp, MyProjectDetailsRouteProp } from '../navigation/navigationTypes';
import { useAppSelector } from '../store/store'
import * as MyProjectsActions from '../store/myProjects/action'



type Props = {
   route: MyProjectDetailsRouteProp,
   navigation: MyProjectDetailsNavigationProp
}

const ProjectDetailsScreen = (props: Props) => {
   const [email, setEmail] = useState('');
   const user = useAppSelector(state => state.user)
   const id = props.route.params.id
   const dispatch = useDispatch()
   const sendContributorInvitation = async () => {
      const notification = new NotificationOut('', NotificationType.request, user.email, email, id)
      createContributorInvitation(notification, email, user.id);
   }
   const deleteProject = async () => {
      await dispatch(MyProjectsActions.asyncDeleteProject(id));
      props.navigation.goBack()
   }
   return (
      <Screen>
         <Text>{id}</Text>
         <TextInput style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
         <Button title="Add Contributor" onPress={sendContributorInvitation}/>
         <Button title="Delete Project" onPress={deleteProject}/>
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