import { Alert } from "react-native"
import { ThunkAction } from "redux-thunk"
import { createProject } from "../../API/myProjects"
import MyProject from "../../models/myProject"
import { RootState } from "../store"
import { AddProject, MyProjectsActions } from "../types"

export enum MY_PROJECTS_ACTION_TYPES {
   SET_PROJECTS = 'SET_PROJECTS',
   ADD_PROJECT = 'ADD_PROJECT',
   REMOVE_PROJECT = 'REMOVE_PROJECT',
   EDIT_PROJECT = 'EDIT_PROJECT'
}

export const asyncAddProject = (project: MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions>  => {
   return async (dispatch, getState) => {
      try{
         const id = await createProject(getState().user.id, project)
         project.setId(id);
         dispatch(addProjectAction(project))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
      }
      
   }
}

export const addProjectAction = (project: MyProject) : AddProject => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.ADD_PROJECT,
      project : project
   }
}