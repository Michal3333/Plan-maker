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

type Props = {
   navigation: MyProjectsNavigationProp
}

const MyProjectsScreen = (props: Props) => {
   const dispatch = useDispatch()
   const myProjects = useAppSelector(state => state.myProjects);
   const [createNewProjectModal, setCreateNewProjectModal] = useState(false)

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

   const addNewProject = async (name: string, weeklyLimit: string, dueDateStr: string) => {
      const dueDate = new Date(dueDateStr);
      const project = new MyProject('', name, '', dueDate, [], parseInt(weeklyLimit), 0, 0, false)
      const result = await dispatch(MyProjectsActions.asyncAddProject(project));
       //@ts-ignore
       if(result){
         setCreateNewProjectModal(false)
      }
  
   }
   
   return (
      <Screen headerImage={true} darkMode={darkMode}>
         <Modal style={styles.modal} animationType='slide'
            visible={createNewProjectModal} presentationStyle="pageSheet" >
               <NewProjectModal addProject={addNewProject} closeModel={() => {setCreateNewProjectModal(false)}}/>
         </Modal>
         <FlatList style={styles.list}
            data={myProjects.projects} 
            renderItem={(itemData) => <ProjectBox id={itemData.item.id} 
               name={itemData.item.name} 
               openDetails={() => {props.navigation.navigate('ProjectDetails', {id: itemData.item.id})}}
               darkMode={darkMode}
               goal={itemData.item.weeklyLimit}
               done={itemData.item.weeklyDone}/>
            }
            ListHeaderComponent={<ThemedTitle style={{fontSize: 50}} darkMode={darkMode}>My Projects</ThemedTitle>}
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