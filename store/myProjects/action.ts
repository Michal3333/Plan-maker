import { Alert } from "react-native"
import { ThunkAction } from "redux-thunk"
import { convertToMyProject, convertToSharedProject, createProject, deleteProject, getMyProjects } from "../../API/myProjects"
import MyProject from "../../models/MyProject"
import { RootState } from "../store"
import { AddProject, ConvertToNormal, ConvertToShared, MyProjectsActions, RemoveProject, SetProjects, UserActions } from "../types"
import { changePendingStatusAction } from "../user/action"

export enum MY_PROJECTS_ACTION_TYPES {
   SET_PROJECTS = 'SET_PROJECTS',
   ADD_PROJECT = 'ADD_PROJECT',
   REMOVE_PROJECT = 'REMOVE_PROJECT',
   EDIT_PROJECT = 'EDIT_PROJECT',
   CONVERT_TO_SHARED = 'CONVERT_TO_SHARED',
   CONVERT_TO_NORMAL = 'CONVERT_TO_NORMAL'
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

export const asyncDeleteProject = (project : MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions | UserActions>  => {
   return async (dispatch, getState) => {
      try {
         dispatch(changePendingStatusAction(true))
         await deleteProject(getState().user.id, project)
         dispatch(deleteProjectAction(project.id))
         dispatch(changePendingStatusAction(false))

      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
      }
   }
}
export const deleteProjectAction = (projectId: string) : RemoveProject => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT,
      projectId: projectId
   }
}
export const asyncConvertToShared = (project : MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions | UserActions>  => {
   return async (dispatch, getState) => {
      try {
         dispatch(changePendingStatusAction(true))
         const sharedProject = await convertToSharedProject(getState().user.id, project)
         dispatch(convertToSharedAction(sharedProject))
         dispatch(changePendingStatusAction(false))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
      }
   }
}
export const convertToSharedAction = (sharedProject : MyProject) : ConvertToShared => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.CONVERT_TO_SHARED,
      sharedProject: sharedProject
   }
}

export const asyncConvertToNormal = (project : MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions | UserActions>  => {
   return async (dispatch, getState) => {
      try {
         dispatch(changePendingStatusAction(true))
         const normalProject = await convertToMyProject(getState().user.id, project)
         dispatch(convertToNormalAction(normalProject))
         dispatch(changePendingStatusAction(false))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
      }
   }
}
export const convertToNormalAction = (normalProject : MyProject) : ConvertToNormal => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.CONVERT_TO_NORMAL,
      normalProject: normalProject
   }
}

