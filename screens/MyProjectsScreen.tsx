import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Button, FlatList, Text, Modal, useColorScheme } from 'react-native'
import { useAppSelector,  } from '../store/store'
import { useDispatch } from 'react-redux';
import MyProject from '../models/MyProject';
import * as MyProjectsActions from '../store/myProjects/action'
import Screen from '../components/UI/Screen';
import ProjectBox from '../components/MyProjects/ProjectBox';
import { MyProjectsNavigationProp } from '../navigation/navigationTypes';
import NewProjectModal from '../components/MyProjects/newProjectModal';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/UI/CustomHeader';
import ThemedTitle from '../components/UI/ThemedTitle';
import AddTimeModal from '../components/MyProjects/addTimeModal';

type Props = {
   navigation: MyProjectsNavigationProp
}

const MyProjectsScreen = (props: Props) => {
   const dispatch = useDispatch()
   const myProjects = useAppSelector(state => state.myProjects);
   const [createNewProjectModal, setCreateNewProjectModal] = useState(false)
   const [addTimeModal,setAddTimeModal] = useState(false)
   const [projectToAddTimeId, setProjectToAddTimeId] = useState("")

   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";

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

   const addNewProject = async (name: string, weeklyLimit: string, dueDateStr: string, color: string) => {
      const dueDate = new Date(dueDateStr);
      const project = new MyProject('', name, color, dueDate, [], parseInt(weeklyLimit), 0, 0, false)
      const result = await dispatch(MyProjectsActions.asyncAddProject(project));
       //@ts-ignore
       if(result){
         setCreateNewProjectModal(false)
      }
  
   }
   
   return (
      <Screen headerImage={true} darkMode={darkMode}>
         <Modal style={styles.modal} animationType='slide'
            visible={createNewProjectModal} presentationStyle="fullScreen" >
               <NewProjectModal darkMode={darkMode} addProject={addNewProject} closeModel={() => {setCreateNewProjectModal(false)}}/>
         </Modal>
         <Modal animationType='fade'
            visible={addTimeModal} 
            transparent={true}>
               <AddTimeModal darkMode={darkMode} 
               closeModal={() => {setAddTimeModal(false)}} 
               addTime={(time: number) => {
                  const selectedProject = myProjects.projects.find(x => x.id === projectToAddTimeId)
                  if(selectedProject){
                     dispatch(MyProjectsActions.asyncAddTime(selectedProject.id, selectedProject.shared, time));
                     setAddTimeModal(false);
                  }
               }}/>
         </Modal>
         <View style={styles.list}>
            <FlatList 
               data={myProjects.projects} 
               renderItem={(itemData) => <ProjectBox id={itemData.item.id} 
                  name={itemData.item.name} 
                  openDetails={() => {props.navigation.navigate('ProjectDetails', {id: itemData.item.id})}}
                  darkMode={darkMode}
                  goal={itemData.item.weeklyLimit}
                  done={itemData.item.weeklyDone}
                  color={itemData.item.color}
                  openAddTimeModal={() => {
                     setProjectToAddTimeId(itemData.item.id)
                     setAddTimeModal(true)
                  }}/>
                 
               }
               ListHeaderComponent={<ThemedTitle style={{fontSize: 50}} darkMode={darkMode}>My Projects</ThemedTitle>}
            />
         </View>
        
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      // width: '100%',
   },
   modal:{
      height: '80%',
      backgroundColor: 'black'
   },
})

export default MyProjectsScreen;