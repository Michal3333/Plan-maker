import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Modal } from 'react-native'
import { useDispatch } from 'react-redux';
import { createContributorInvitation } from '../API/notifications';
import Screen from '../components/UI/Screen';
import NotificationOut, { NotificationType } from '../models/NotificationOut';
import { MyProjectDetailsNavigationProp, MyProjectDetailsRouteProp } from '../navigation/navigationTypes';
import { useAppSelector } from '../store/store'
import * as MyProjectsActions from '../store/myProjects/action'
import ContributorsModal from '../components/MyProjects/contributorsModal';



type Props = {
   route: MyProjectDetailsRouteProp,
   navigation: MyProjectDetailsNavigationProp
}

const ProjectDetailsScreen = (props: Props) => {
   const [email, setEmail] = useState('');
   const [editMode, setEditMode] = useState(false);
   const [contributorsModal, setContributorsModal] = useState(false)
   const user = useAppSelector(state => state.user);
   const id = props.route.params.id
   const project = useAppSelector(state => state.myProjects.projects.find(x => x.id === id));
  
   const dispatch = useDispatch()
   const sendContributorInvitation = async () => {
      const notification = new NotificationOut('', NotificationType.request, user.email, email, id)
      createContributorInvitation(notification, email, user.id);
   }
   const deleteProject = async () => {
      if(project){
         await dispatch(MyProjectsActions.asyncDeleteProject(project));
         props.navigation.goBack()
      }
   }
   const addContributor = async (email:string) => {
      if(project){
         const result = await dispatch(MyProjectsActions.asyncAddContributor(project.id, email));
         //@ts-ignore
         if(result){
            setContributorsModal(false)
         }
         
      }
   }
   return (
      <Screen>
         {project &&
         <View>
            <Text>{project.name}</Text>
            <Text>{project.dueDate.toDateString()}</Text>
            <Text>{project.weeklyLimit}</Text>
            <Text>{project.weeklyDone}</Text>
            <Text>{project.totalHours}</Text>
            {/* <TextInput style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
            <Button title="Add Contributor" onPress={sendContributorInvitation}/> */}
            <Button title="Delete Project" onPress={deleteProject}/>

            {
               !project.shared ?
                  <Button title="Convert To Shared Project" onPress={() => {dispatch(MyProjectsActions.asyncConvertToShared(project))}}/>
               :
               (
                  <View>
                     <Button title="Convert To Normal Project" onPress={() => {dispatch(MyProjectsActions.asyncConvertToNormal(project));}}/>
                     <Button title="Contributors" onPress={() => {setContributorsModal(true)}}/>
                     <Modal  animationType='slide' visible={contributorsModal} presentationStyle="pageSheet" >
                           <ContributorsModal closeModel={() => {setContributorsModal(false)}} contributors={project.contributors} addConributor={addContributor}/>
                     </Modal>
                  </View>
                  
               )
              
            }
            
           

            <FlatList data={project?.tasks} renderItem={(itemData) => <Text>{itemData.item.text}</Text>}/>
         </View>
         }
         {!project && <Text>{'Project Not Found'}</Text>}
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