import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Modal, useColorScheme } from 'react-native'
import { useDispatch } from 'react-redux';
import Screen from '../components/UI/Screen';
import { MyProjectDetailsNavigationProp, MyProjectDetailsRouteProp } from '../navigation/navigationTypes';
import { useAppSelector } from '../store/store'
import * as MyProjectsActions from '../store/myProjects/action'
import ContributorsModal from '../components/MyProjects/contributorsModal';
import { useNavigation, useRoute } from '@react-navigation/native';
import Card from '../components/UI/Card';
import ThemedLabel from '../components/UI/ThemedLabel';
import ProgressIndicator from '../components/UI/ProgressIndicator';
import * as Colors from '../constants/Colors'
import ThemedText from '../components/UI/ThemdText';
import ThemedButton from '../components/UI/ThemedButton';
import AddTimeModal from '../components/MyProjects/addTimeModal';
import AddTaskModal from '../components/MyProjects/newTaskModal';
import ThemedIcon from '../components/UI/ThemedIcon';
import TaskItem from '../components/MyProjects/TaskItem';




type Props = {
   // route: MyProjectDetailsRouteProp,
   // navigation: MyProjectDetailsNavigationProp
}

const ProjectDetailsScreen = (props: Props) => {
   const navigation = useNavigation<MyProjectDetailsNavigationProp>();
   const route = useRoute<MyProjectDetailsRouteProp>();
   const [editMode, setEditMode] = useState(false);
   const [contributorsModal, setContributorsModal] = useState(false)
   const [addTimeModal,setAddTimeModal] = useState(false)
   const [addTaskModal,setAddTaskModal] = useState(false)
   const [tasksEditMode, setTasksEditMode] = useState(false)


   const {id} = route.params;
   const project = useAppSelector(state => state.myProjects.projects).find(x => x.id === id);

   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode)
  
   const dispatch = useDispatch()
   const deleteProject = async () => {
      if(project){
         await dispatch(MyProjectsActions.asyncDeleteProject(project));
         navigation.goBack()
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
      <Screen darkMode={false}>
          <Modal animationType='fade'
            visible={addTimeModal} 
            transparent={true}>
               <AddTimeModal darkMode={darkMode} 
               closeModal={() => {setAddTimeModal(false)}} 
               addTime={(time: number) => {
                  if(project){
                     dispatch(MyProjectsActions.asyncAddTime(project.id, project.shared, time));
                     setAddTimeModal(false);
                  }
               }}/>
         </Modal>
         <Modal animationType='fade'
            visible={addTaskModal} 
            transparent={true}>
               <AddTaskModal darkMode={darkMode} 
               closeModal={() => {setAddTaskModal(false)}} 
               addTask={(taskName: string) => {
                  if(project){
                     dispatch(MyProjectsActions.asyncAddTask(project.id, project.shared, taskName));
                     setAddTaskModal(false)
                  }
               }}/>
         </Modal>
         {project &&
         // <View>
         //    <Text>{project.name}</Text>
         //    <Text>{project.dueDate.toDateString()}</Text>
         //    <Text>{project.weeklyLimit}</Text>
         //    <Text>{project.weeklyDone}</Text>
         //    <Text>{project.totalHours}</Text>
         //    <Button title="Delete Project" onPress={deleteProject}/>

         //    {
         //       !project.shared ?
         //          <Button title="Convert To Shared Project" onPress={() => {dispatch(MyProjectsActions.asyncConvertToShared(project))}}/>
         //       :
         //       (
         //          <View>
         //             <Button title="Convert To Normal Project" onPress={() => {dispatch(MyProjectsActions.asyncConvertToNormal(project));}}/>
         //             <Button title="Contributors" onPress={() => {setContributorsModal(true)}}/>
         //             <Modal  animationType='slide' visible={contributorsModal} presentationStyle="pageSheet" >
         //                   <ContributorsModal closeModel={() => {setContributorsModal(false)}} contributors={project.contributors} addConributor={addContributor} deleteContributor={deleteContributor}/>
         //             </Modal>
         //          </View>
         //       )
         //    }
         //    <Button title="Add 2h" onPress={() => {
         //       dispatch(MyProjectsActions.asyncAddTime(project.id, project.shared, 2))
         //    }}/>

         //    <Button title="updated +1h and + 1 to name" onPress={() => {
         //       dispatch(MyProjectsActions.asyncEditProjectData(project.id, project.shared, project.name + '1', project.dueDate, project.color, project.weeklyLimit + 1))
         //    }}/>
            
            
           

         //    <FlatList data={project?.tasks} renderItem={(itemData) => <Text>{itemData.item.text}</Text>}/>
         // </View>
         <View style={{width: '100%'}}>
             <View style={{marginTop: 10, marginLeft: 10}} >
                  <ThemedLabel style={{fontSize: 40}} darkMode={darkMode}>{project.name}</ThemedLabel>
               </View>
             <Card darkMode={darkMode}>
               <ProgressIndicator darkMode={darkMode} max={project.weeklyLimit} current={project.weeklyDone} color={project.color} style={{marginTop: 10}}/>
               <View style={styles.scoreBox}>
                  <View style={{...styles.scoreSqare, backgroundColor: backgroundDarker, marginRight: 20 }}>
                     <ThemedText darkMode={darkMode}>Total hours</ThemedText>
                     <ThemedLabel darkMode={darkMode} style={{color: project.color, fontSize: 60}}>{project.totalHours}</ThemedLabel>
                  </View>
               
                  <View style={{...styles.scoreSqare, backgroundColor: project.color}}>
                     <ThemedText darkMode={darkMode} style={{color: 'white'}}>Complited Weeks</ThemedText>
                     <ThemedLabel darkMode={darkMode} style={{color: 'white', fontSize: 60}}>3</ThemedLabel>
                  </View>
               </View>
               <View style={styles.buttonsBox}>
                  <ThemedButton title="Add time" 
                     darkMode={darkMode} 
                     disabled={false} 
                     onPress={() => {setAddTimeModal(true)}}
                     type="confirm" 
                     style={{ width: "100%"}}/>
               </View>
            </Card>
            <Card darkMode={darkMode} style={{width: '100%'}}>
               <View style={styles.tasksBar}>
                  <ThemedLabel style={{fontSize: 20,}} darkMode={darkMode}>Tasks</ThemedLabel>
                  <View style={{flexDirection: 'row'}}>
                     <ThemedIcon darkMode={darkMode} icon='pencil' onPress={() => {setTasksEditMode((editMode) => !editMode)}} color={project.color} style={{...styles.addTaskIcon, marginRight: 5}} size={35} />
                     <ThemedIcon darkMode={darkMode} icon='ios-add' onPress={() => {setAddTaskModal(true)}} color={project.color} style={{...styles.addTaskIcon}} size={35} />
                  </View>
               </View>
               {project.tasks.length > 0 ?
                  <FlatList style={styles.list} data={project.tasks} renderItem={(itemData) => <TaskItem darkMode={darkMode} editMode={tasksEditMode} text={itemData.item.text} color={project.color}/>}/>
                  :
                  <View style={{alignItems: 'center', padding: 50, backgroundColor: 'black', width: '100%', marginTop: 10, borderRadius: 20}}>
                     <ThemedLabel style={{fontSize: 20}} darkMode={darkMode}>No Task</ThemedLabel>
                  </View>
               }
            </Card>
         </View>
        

         }
         {!project && <Text>{'Project Not Found'}</Text>}
      </Screen> 
   )
}

const styles = StyleSheet.create({
   list : {
      width: '100%',
      marginTop: 10
   },
   input: {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '80%',
      marginBottom: 20
   },
   scoreSqare: {
      alignItems: 'center',
      // width: '30%',
      flex: 1,
      borderRadius: 10,
      paddingTop: 15
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
      maxWidth: 400,
      marginBottom: 10
   },
   scoreBox: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20
   },
   tasksBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
   },
   addTaskIcon : {
      padding: 2, 
      paddingHorizontal: 15,  
      margin: 0, 
      backgroundColor: 'black', 
      borderRadius: 20
   }
})

export default ProjectDetailsScreen;