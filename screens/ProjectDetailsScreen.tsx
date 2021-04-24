import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native'
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
   const [editMode, setEditMode] = useState(false);
   const user = useAppSelector(state => state.user);
   const id = props.route.params.id
   const project = useAppSelector(state => state.myProjects.projects.find(x => x.id === id));
  
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
         <Text>{project?.name}</Text>
         <Text>{project?.dueDate.toDateString()}</Text>
         <Text>{project?.weeklyLimit}</Text>
         <Text>{project?.weeklyDone}</Text>
         <Text>{project?.totalHours}</Text>
         {/* <TextInput style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
         <Button title="Add Contributor" onPress={sendContributorInvitation}/> */}
         <Button title="Delete Project" onPress={deleteProject}/>

         <FlatList data={project?.tasks} renderItem={(itemData) => <Text>{itemData.item.text}</Text>}/>
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