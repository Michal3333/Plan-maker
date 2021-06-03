import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Modal, useColorScheme, ScrollView, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux';
import Screen from '../components/UI/Screen';
import { MyProjectDetailsNavigationProp, MyProjectDetailsRouteProp, OtherProjectDetailsNavigationProp, OtherProjectDetailsRouteProp } from '../navigation/navigationTypes';
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
import * as OtherProjectActions from '../store/otherProjects/action' 




type Props = {
   navigation: OtherProjectDetailsNavigationProp
}

const OtherProjectDetailsScreen = ({navigation}: Props) => {
   
   const route = useRoute<OtherProjectDetailsRouteProp>();

   const [editMode, setEditMode] = useState(false)

   const {id} = route.params;
   const project = useAppSelector(state => state.otherProjects.otherProjects).find(x => x.id === id);

   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode)

   const deleteOtherProject = () => {
      // dispatch(OtherProjectActions.)
   }
  
   const dispatch = useDispatch()

   const editButtonText = editMode ? "Cancel" : "Edit"
   return (
      <ScrollView>
      <Screen darkMode={false}>
          
         {project &&    
         <View style={{width: '100%'}}>
            <View style={{marginTop: 10, marginLeft: 10}} >
               <ThemedLabel style={{fontSize: 40}} darkMode={darkMode}>{project.name}</ThemedLabel>
            </View>
            <Card darkMode={darkMode}>
               <View style={{width: '100%',alignItems: 'center', justifyContent:'flex-end', flexDirection: 'row'}}>
                  <ThemedButton darkMode={darkMode} onPress={() => {setEditMode(mode => !mode)}} disabled={false} title={editButtonText} type='confirm' style={{paddingHorizontal: 20}}/>
                  {editMode && <ThemedIcon darkMode={darkMode} onPress={deleteOtherProject} icon={"ios-trash"} type="delete" size={30} style={{padding: 0, margin: 0, marginLeft: 20}}/>}
               </View>
               <ProgressIndicator darkMode={darkMode} max={project.weeklyLimit} current={project.weeklyDone} color={project.color} style={{marginTop: 10}}/>
               <ThemedLabel style={{width: '100%', marginTop: 20}} darkMode={darkMode}> Owner : {project.ownerMail}</ThemedLabel>
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
                  <ThemedButton title="Send Message" 
                     darkMode={darkMode} 
                     disabled={false} 
                     onPress={() => {}}
                     type="confirm" 
                     style={{ width: "100%"}}/>
               </View>
            </Card>
            <Card darkMode={darkMode} style={{width: '100%', marginBottom: 20}}>
               <View style={styles.tasksBar}>
                  <ThemedLabel style={{fontSize: 20,}} darkMode={darkMode}>Tasks</ThemedLabel>
               </View>
               {project.tasks &&  project.tasks.length > 0 ?
                  <View style={styles.list}>
                     {
                        project.tasks.map(task => {
                           return <TaskItem key={task.id} darkMode={darkMode} 
                              editMode={false} 
                              text={task.text} 
                              color={project.color}
                              done={task.done}
                              deleteTask={() => {}}
                              changeDone={() => {}}
                              disabled={true}/>
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

export default OtherProjectDetailsScreen;