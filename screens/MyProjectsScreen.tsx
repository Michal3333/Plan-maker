import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Button, FlatList, Text, Modal } from 'react-native'
import { useAppSelector,  } from '../store/store'
import { useDispatch } from 'react-redux';
import myProject from '../models/myProject';
import * as MyProjectsActions from '../store/myProjects/action'
import Screen from '../components/UI/Screen';
import ProjectBox from '../components/MyProjects/ProjectBox';
import { MyProjectsNavigationProp } from '../navigation/navigationTypes';
import NewProjectModal from '../components/MyProjects/newProjectModal';

type Props = {
   navigation: MyProjectsNavigationProp
}

const MyProjectsScreen = (props: Props) => {
   const dispatch = useDispatch()
   const myProjects = useAppSelector(state => state.myProjects);
   const [createNewProjectModal, setCreateNewProjectModal] = useState(false)

   useEffect(() => {
      dispatch(MyProjectsActions.asyncFetchProjects())
   }, [])

   const addNewProject = async (name: string, weeklyLimit: number, dueDateStr: string) => {
      const dueDate = new Date(dueDateStr);
      const project = new myProject('', name, '', dueDate, [], weeklyLimit, 0, 0)
      const result = await dispatch(MyProjectsActions.asyncAddProject(project));
  
   }
   
   return (
      <Screen>
         <Modal animationType='slide'
            visible={createNewProjectModal}>
               <NewProjectModal addProject={addNewProject} closeModel={() => {setCreateNewProjectModal(false)}}/>
         </Modal>
         <FlatList style={styles.list}
            data={myProjects.projects} 
            renderItem={(itemData) => <ProjectBox id={itemData.item.id} name={itemData.item.name} openDetails={() => {props.navigation.navigate('ProjectDetails', {id: itemData.item.id})}}/>}
         />
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      width: '100%'
   }
})

export default MyProjectsScreen;