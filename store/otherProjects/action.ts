import OtherProject from "../../models/OtherProject"
import { AddOtherProject, DeleteOtherProject, InitOtherProjects, OtherProjectsActions, PendingStatusActions, UpdateOtherProject } from "../types"
import { RootState } from "../store"
import { ThunkAction } from "redux-thunk"
import { deleteOtherProject, keepGettingOtherProjects } from "../../API/otherProjects"
import { Alert } from "react-native"
import { changePendingStatusAction } from "../pendingStatus/action"



export enum OTHER_PROJECTS_ACTION_TYPES {
   INIT_OTHER_PROJECTS = 'INIT_OTHER_PROJECTS',
   ADD_OTHER_PROJECT = 'ADD_OTHER_PROJECT',
   UPDATE_OTHER_PROJECT = 'UPDATE_OTHER_PROJECT',
   DELETE_OTHER_PROJECT = "DELETE_OTHER_PROJECT"
}

export const asyncKeepGettingOtherProjects = () : ThunkAction<void, RootState, unknown, OtherProjectsActions>  => {
   return async (dispatch, getStore) => {
      try{
         const callBackAdd = (otherProject: OtherProject) => {
            dispatch(addOtherProject(otherProject));
         }
         const callBackUpdate = (otherProject: OtherProject) => {
            dispatch(updateOtherProject(otherProject));
         }
         const unsubscribe = await keepGettingOtherProjects(getStore().user.id, callBackAdd, callBackUpdate);
         dispatch(initOtherProjects(unsubscribe))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
      }
   }
}


export const addOtherProject = (project: OtherProject) : AddOtherProject => {
   return {
      type: OTHER_PROJECTS_ACTION_TYPES.ADD_OTHER_PROJECT,
      otherProject: project
   }
}

export const initOtherProjects = ( unsubscribe : () => void) : InitOtherProjects => {
   return {
      type: OTHER_PROJECTS_ACTION_TYPES.INIT_OTHER_PROJECTS,
      unsubscribe
   }
}

export const updateOtherProject = (project: OtherProject) : UpdateOtherProject => {
   return {
      type: OTHER_PROJECTS_ACTION_TYPES.UPDATE_OTHER_PROJECT,
      otherProject: project
   }
}

export const asyncAnswerInvitation = (projectId: string) : ThunkAction<void, RootState, unknown, OtherProjectsActions | PendingStatusActions>  => {
   return async (dispatch, getStore) => {
      try{
         dispatch(changePendingStatusAction(true))
         await deleteOtherProject(getStore().user.id, projectId);
         dispatch(deleteOtherProjectAction(projectId))
         dispatch(changePendingStatusAction(false))
      } catch (err) {
         console.log(err)
         dispatch(changePendingStatusAction(false))
         Alert.alert("There is something wrong!!!!", err.message);
      }
   }
}

export const deleteOtherProjectAction = (projectId : string) : DeleteOtherProject => {
   return {
      type: OTHER_PROJECTS_ACTION_TYPES.DELETE_OTHER_PROJECT,
      otherProjectId: projectId
   }
}