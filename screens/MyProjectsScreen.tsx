import React, {useEffect} from 'react';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native'
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import myProject from '../models/myProject';
import * as MyProjectsActions from '../store/myProjects/action'
import { LoadingScreen } from '../components/UI/Screen';
import LoadingIndicator from '../components/UI/LoadingIndicator';



type Props = {

}

const MyProjectsScreen = (props: Props) => {
   const myProjects = useAppSelector(state => state.myProjects);
   const dispatch = useDispatch()
   const loading = useAppSelector(state => state.user.pendingLoggin)
   useEffect(() => {
      dispatch(MyProjectsActions.asyncFetchProjects())
   }, [])
   console.log('xd2')
   return (
      <>
         <View>
            <Button title="Add projcet" onPress={() => {
               const project = new myProject('', 'test', "#bbbbb", new Date(), [{id: '', dueDate: new Date(), done: false, text: 'adasd'}])
               dispatch(MyProjectsActions.asyncAddProject(project))
            }}/>
         </View>
         <FlatList data={myProjects.projects} renderItem={(itemData) => <Text>{itemData.item.id}</Text>}/>
         {loading && <LoadingIndicator />}
      </>
   )
}

const styles = StyleSheet.create({

})

export default MyProjectsScreen;