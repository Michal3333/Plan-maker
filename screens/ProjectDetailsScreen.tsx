import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Modal, useColorScheme, ScrollView, SafeAreaView } from 'react-native'
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
import NewProjectModal from '../components/MyProjects/newProjectModal';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeader';
import MessagesModal from '../components/MyProjects/messagesModal';
import StatsModal from '../components/MyProjects/StatsModal';



type Props = {
   route: MyProjectDetailsRouteProp,
   navigation: MyProjectDetailsNavigationProp
}

const ProjectDetailsScreen = ({navigation, route}: Props) => {
   // const navigation = useNavigation<MyProjectDetailsNavigationProp>();
   // const route = useRoute<MyProjectDetailsRouteProp>();
   const [contributorsModal, setContributorsModal] = useState(false)
   const [addTimeModal,setAddTimeModal] = useState(false)
   const [addTaskModal,setAddTaskModal] = useState(false)
   const [updateModal, setUpdateModal] = useState(false)
   const [tasksEditMode, setTasksEditMode] = useState(false)
   const [messagesModal, setMessagesModal] = useState(false)
   const [statsModal, setStatsModal] = useState(false)

   useEffect(() => {
      dispatch(MyProjectsActions.asyncFetchProjects());
      navigation.setOptions({
         headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <Item title='add project' iconName={'ios-chatbubble-ellipses-sharp'} onPress={() => {setMessagesModal(true)}}/>
               <Item title='contributors' iconName={'people-circle-sharp'} onPress={() => {setContributorsModal(true)}}/>
               <Item title='stats' iconName={'ios-stats-chart'} onPress={() => {setStatsModal(true)}}/>
            </HeaderButtons>
         )
      })
   }, [])

   

   const {id} = route.params;
   const project = useAppSelector(state => state.myProjects.projects).find(x => x.id === id);
   const logs = useAppSelector(state => state.myProjects.logs).filter(x => x.projectId === id);

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
         dispatch(MyProjectsActions.asyncDeleteContributor(project.id, contributorId));
      }
   }
   const addContributor = async (email : string, allowMessages: boolean, allowDetails: boolean) => {
      if(project){
         dispatch(MyProjectsActions.asyncAddContributor(project.id, email, allowMessages, allowDetails));
      }
   }
   const updateContributor = async(contributorId : string, allowMessages: boolean, allowDetails: boolean) => {
      if(project){
         dispatch(MyProjectsActions.asyncUpdateContributor(project.id, contributorId, allowMessages, allowDetails));
      }
   }
   const updateProject = async (name: string, weeklyLimit: string, dueDateStr: string, color: string, icon: string) => {
      if(project){
         const dueDate = new Date(dueDateStr);
         const result = await dispatch(MyProjectsActions.asyncEditProjectData(project.id, project.shared, name, project.dueDate, color, parseInt(weeklyLimit), icon))
         //@ts-ignore
         if(result){
            setUpdateModal(false)
         }
      }
      
  
   }

   const editButtonText = tasksEditMode ? "Cancel" : "Edit"
   return (
      <ScrollView>
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
         <Modal style={styles.modal} animationType='slide'
            visible={updateModal} presentationStyle="fullScreen" >
               <NewProjectModal darkMode={darkMode} addProject={updateProject} closeModel={() => {setUpdateModal(false)}} name={project?.name} color={project?.color} icon={project?.icon} weeklyLimit={project?.weeklyLimit.toString()} deleteProject={deleteProject}/>
         </Modal>
         <Modal style={styles.modal} animationType='slide'
            visible={messagesModal} presentationStyle="fullScreen" >
               <MessagesModal darkMode={darkMode} projectId={project ? project.id : ''} closeModal={() => {setMessagesModal(false)}}/>
         </Modal>
         <Modal style={styles.modal} animationType='slide'
            visible={statsModal} presentationStyle="fullScreen">
               <StatsModal darkMode={darkMode} closeModel={() => setStatsModal(false)} logs={logs}/>
         </Modal>
         <Modal style={styles.modal} animationType='slide'
            visible={contributorsModal} presentationStyle="fullScreen">
               <ContributorsModal color={project ? project.color : 'black'} 
                  darkMode={darkMode}  
                  closeModel={() => {setContributorsModal(false)}} 
                  addConributor={addContributor} 
                  deleteContributor={deleteContributor} 
                  contributors={project ? project.contributors : []}
                  shared={project ? project.shared : false}
                  convertToShared={() => {
                     if(project){
                       dispatch(MyProjectsActions.asyncConvertToShared(project))
                     }
                  }}
                  convertToNormal={() => {
                     if(project){
                       dispatch(MyProjectsActions.asyncConvertToNormal(project))
                     }
                  }}
                  updateContributor={updateContributor}
               />
         </Modal>
         {project &&    
         <View style={{width: '100%'}}>
            <View style={{marginTop: 10, marginLeft: 10}} >
               <ThemedLabel style={{fontSize: 40}} darkMode={darkMode}>{project.name}</ThemedLabel>
            </View>
            <Card darkMode={darkMode}>
               <View style={{width: '100%', alignItems:'flex-end'}}>
                  <ThemedButton darkMode={darkMode} onPress={() => {setUpdateModal(true)}} disabled={false} title="Edit" type='confirm' style={{paddingHorizontal: 20}}/>
               </View>
               <ProgressIndicator darkMode={darkMode} max={project.weeklyLimit} current={project.weeklyDone} color={project.color} style={{marginTop: 10}}/>
               <View style={styles.scoreBox}>
                  <View style={{...styles.scoreSqare, backgroundColor: backgroundDarker, marginRight: 20 }}>
                     <ThemedText darkMode={darkMode}>Total hours</ThemedText>
                     <ThemedLabel darkMode={darkMode} style={{color: project.color, fontSize: 60}}>{project.totalHours}</ThemedLabel>
                  </View>
                  <View style={{...styles.scoreSqare, backgroundColor: project.color}}>
                     <ThemedText darkMode={darkMode} style={{color: 'white'}}>Complited Weeks</ThemedText>
                     <ThemedLabel darkMode={darkMode} style={{color: 'white', fontSize: 60}}>0</ThemedLabel>
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
            <Card darkMode={darkMode} style={{width: '100%', marginBottom: 20}}>
               <View style={styles.tasksBar}>
                  <ThemedLabel style={{fontSize: 20,}} darkMode={darkMode}>Tasks</ThemedLabel>
                  <View style={{flexDirection: 'row'}}>
                     <ThemedIcon darkMode={darkMode} icon='ios-add' onPress={() => {setAddTaskModal(true)}} color={project.color} style={{...styles.addTaskIcon, backgroundColor: backgroundDarker}} size={35} />
                     <ThemedButton darkMode={darkMode} onPress={() => {setTasksEditMode((editMode) => !editMode)}} disabled={false} title={editButtonText} type='confirm' style={{paddingHorizontal: 20, marginLeft: 5}}/>
                  </View>
               </View>
               {project.tasks.length > 0 ?
                  <View style={styles.list}>
                     {
                        project.tasks.map(task => {
                           return <TaskItem key={task.id} darkMode={darkMode} 
                              editMode={tasksEditMode} 
                              text={task.text} 
                              color={project.color}
                              done={task.done}
                              deleteTask={() => {
                                 dispatch(MyProjectsActions.asyncDeleteTask(project.id, project.shared, task))
                              }}
                              changeDone={() => {
                                 dispatch(MyProjectsActions.asyncUpdateTask(project.id, project.shared, task.id, !task.done, task.text))
                              }}/>
                        })
                     }
                  </View>
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
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   list : {
      width: '100%',
      marginTop: 10,
   },
   scoreSqare: {
      alignItems: 'center',
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
   addTaskIcon: {
      padding: 2, 
      paddingHorizontal: 15,  
      margin: 0, 
      backgroundColor: 'black', 
      borderRadius: 20
   },
   modal: {
      height: '80%',
      backgroundColor: 'black'
   },
})

export default ProjectDetailsScreen;