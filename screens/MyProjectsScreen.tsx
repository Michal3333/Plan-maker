import React from 'react';
import { StyleSheet, View, Button } from 'react-native'
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { createProject, getMyProjects } from '../API/myProjects';
import myProject from '../models/myProject';
import * as userActions from '../store/user/action'



type Props = {

}

const MyProjectsScreen = (props: Props) => {
   const user = useAppSelector(state => state.user)
   const dispatch = useDispatch()
   return (
      <View>
         <Button title="Add projcet" onPress={() => {
            const project = new myProject('', 'test', "#bbbbb", new Date(), [{id: '', dueDate: new Date(), done: false, text: 'adasd'}])
            createProject(user.id, project);
         }}/>
         <Button title="Get projects" onPress={() => {
            getMyProjects(user.id);
         }}/>
         <Button title="Log out" onPress={() => {
            dispatch(userActions.asyncSignOut())
         }}/>
      </View>
   )
}

const styles = StyleSheet.create({

})

export default MyProjectsScreen;