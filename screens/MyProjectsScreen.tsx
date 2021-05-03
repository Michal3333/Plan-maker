import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Button, FlatList, Text, Modal } from 'react-native'
import { useAppSelector,  } from '../store/store'
import { useDispatch } from 'react-redux';
import myProject from '../models/MyProject';
import * as MyProjectsActions from '../store/myProjects/action'
import Screen from '../components/UI/Screen';
import ProjectBox from '../components/MyProjects/ProjectBox';
import { MyProjectsNavigationProp } from '../navigation/navigationTypes';
import NewProjectModal from '../components/MyProjects/newProjectModal';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/UI/CustomHeader';

type Props = {
   navigation: MyProjectsNavigationProp
}

const MyProjectsScreen = (props: Props) => {
   const dispatch = useDispatch()
   const myProjects = useAppSelector(state => state.myProjects);
   const [createNewProjectModal, setCreateNewProjectModal] = useState(false)

   useEffect(() => {
      dispatch(MyProjectsActions.asyncFetchProjects());
      props.navigation.setOptions({
         headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <Item title='add project' iconName={'ios-add'} onPress={() => {setCreateNewProjectModal(true)}}/>
            </HeaderButtons>
         )
      })
   }, [])

   const addNewProject = async (name: string, weeklyLimit: string, dueDateStr: string) => {
      const dueDate = new Date(dueDateStr);
      const project = new myProject('', name, '', dueDate, [], parseInt(weeklyLimit), 0, 0, [])
      const result = await dispatch(MyProjectsActions.asyncAddProject(project));
       //@ts-ignore
       if(result){
         setCreateNewProjectModal(false)
      }
  
   }
   
   return (
      <Screen withDrawerButton={true}>
         <Modal style={styles.modal} animationType='slide'
            visible={createNewProjectModal} presentationStyle="pageSheet" >
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
   },
   modal:{
      height: '80%'
   }
})

export default MyProjectsScreen;