import React, {useEffect} from 'react';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native'
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import myProject from '../models/myProject';
import * as MyProjectsActions from '../store/myProjects/action'
import Screen from '../components/UI/Screen';



type Props = {

}

const MyProjectsScreen = (props: Props) => {
   const dispatch = useDispatch()
   const myProjects = useAppSelector(state => state.myProjects);

   useEffect(() => {
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
         <FlatList data={myProjects.projects} renderItem={(itemData) => <Text>{itemData.item.id}</Text>}/>
      </Screen>
   )
}

const styles = StyleSheet.create({

})

export default MyProjectsScreen;