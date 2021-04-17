import React, {useEffect} from 'react';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native'
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import myProject from '../models/myProject';
import * as MyProjectsActions from '../store/myProjects/action'
import Screen from '../components/UI/Screen';
import ProjectBox from '../components/MyProjects/ProjectBox';
import { MyProjectsNavigationProp } from '../navigation/navigationTypes';


type Props = {
   navigation: MyProjectsNavigationProp
}

const MyProjectsScreen = (props: Props) => {
   const dispatch = useDispatch()
   const myProjects = useAppSelector(state => state.myProjects);

   useEffect(() => {
      console.log('xd')
      dispatch(MyProjectsActions.asyncFetchProjects())
   }, [])
   
   return (
      <Screen>
         <View>
            <Button title="Add projcet" onPress={() => {
               const project = new myProject('', 'test', "#bbbbb", new Date(), [{id: '', dueDate: new Date(), done: false, text: 'adasd'}])
               dispatch(MyProjectsActions.asyncAddProject(project))
            }}/>
         </View>
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