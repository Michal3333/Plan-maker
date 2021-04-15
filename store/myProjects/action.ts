import { Alert } from "react-native"
import { ThunkAction } from "redux-thunk"
import { createProject, getMyProjects } from "../../API/myProjects"
import MyProject from "../../models/myProject"
import { RootState } from "../store"
import { AddProject, MyProjectsActions, SetProjects, UserActions } from "../types"
import { changePendingStatusAction } from "../user/action"

export enum MY_PROJECTS_ACTION_TYPES {
   SET_PROJECTS = 'SET_PROJECTS',
   ADD_PROJECT = 'ADD_PROJECT',
   REMOVE_PROJECT = 'REMOVE_PROJECT',
   EDIT_PROJECT = 'EDIT_PROJECT'
}

export const asyncAddProject = (project: MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions | UserActions>  => {
   return async (dispatch, getState) => {
      try{
         dispatch(changePendingStatusAction(true))
         const id = await createProject(getState().user.id, project)
         project.setId(id);
         dispatch(addProjectAction(project))
         dispatch(changePendingStatusAction(false))
         return true;
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
         return false;
      }
   }
}

export const addProjectAction = (project: MyProject) : AddProject => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.ADD_PROJECT,
      project : project
   }
}

export const asyncFetchProjects = () : ThunkAction<void, RootState, unknown, MyProjectsActions | UserActions>  => {
   return async (dispatch, getState) => {
      try {
         dispatch(changePendingStatusAction(true))
         const projects = await getMyProjects(getState().user.id)
         dispatch(setProjectsAction(projects))
         dispatch(changePendingStatusAction(false))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
      }
   }
}
export const setProjectsAction = (projects: MyProject[]) : SetProjects => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.SET_PROJECTS,
      projects : projects
   }
}

