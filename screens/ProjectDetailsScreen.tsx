import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Modal } from 'react-native'
import { useDispatch } from 'react-redux';
import Screen from '../components/UI/Screen';
import { MyProjectDetailsNavigationProp, MyProjectDetailsRouteProp } from '../navigation/navigationTypes';
import { useAppSelector } from '../store/store'
import * as MyProjectsActions from '../store/myProjects/action'
import ContributorsModal from '../components/MyProjects/contributorsModal';



type Props = {
   route: MyProjectDetailsRouteProp,
   navigation: MyProjectDetailsNavigationProp
}

const ProjectDetailsScreen = (props: Props) => {
   const [editMode, setEditMode] = useState(false);
   const [contributorsModal, setContributorsModal] = useState(false)
   const {id} = props.route.params;
   const project = useAppSelector(state => state.myProjects.projects).find(x => x.id === id);
  
   const dispatch = useDispatch()
   const deleteProject = async () => {
      if(project){
         await dispatch(MyProjectsActions.asyncDeleteProject(project));
         props.navigation.goBack()
      }
   }
   const deleteContributor = (contributorId : string) => {
      if(project){
         console.log(contributorId)
         dispatch(MyProjectsActions.asyncDeleteContributor(project.id, contributorId));
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
                           <ContributorsModal closeModel={() => {setContributorsModal(false)}} contributors={project.contributors} addConributor={addContributor} deleteContributor={deleteContributor}/>
                     </Modal>
                  </View>
               )
            }
            <Button title="Add 2h" onPress={() => {
               dispatch(MyProjectsActions.asyncAddTime(project.id, project.shared, 2))
            }}/>

            <Button title="updated +1h and + 1 to name" onPress={() => {
               dispatch(MyProjectsActions.asyncEditProjectData(project.id, project.shared, project.name + '1', project.dueDate, project.color, project.weeklyLimit + 1))
            }}/>
            
            
           

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