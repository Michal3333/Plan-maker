import { Alert } from "react-native"
import { ThunkAction } from "redux-thunk"
import { CONTRIBUTOR_STATUS } from "../../API/collections"
import { addContributor, addTask, addTime, convertToMyProject, convertToSharedProject, createProject, deleteContributor, deleteProject, editProject, getMyProjects } from "../../API/myProjects"
import Contributor from "../../models/Contributor"
import MyProject, { projecTask } from "../../models/MyProject"
import { changePendingStatusAction } from "../pendingStatus/action"
import { RootState } from "../store"
import { AddContributor, AddProject, AddProjectTime, AddTask, ConvertToNormal, ConvertToShared, DeleteContributor, EditProjectData, MyProjectsActions, PendingStatusActions, RemoveProject, SetProjects, UserActions } from "../types"

export enum MY_PROJECTS_ACTION_TYPES {
   SET_PROJECTS = 'SET_PROJECTS',
   ADD_PROJECT = 'ADD_PROJECT',
   REMOVE_PROJECT = 'REMOVE_PROJECT',
   EDIT_PROJECT = 'EDIT_PROJECT',
   ADD_TIME = 'ADD_TIME',
   CONVERT_TO_SHARED = 'CONVERT_TO_SHARED',
   CONVERT_TO_NORMAL = 'CONVERT_TO_NORMAL',
   ADD_CONTRIBUTOR = 'ADD_CONTRIBUTOR',
   DELETE_CONTRIBUTOR = 'DELETE_CONTRIBUTOR',
   ADD_TASK = 'ADD_TASK'
}

export const asyncAddProject = (project: MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
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

export const asyncFetchProjects = () : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
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

export const asyncDeleteProject = (project : MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
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
export const asyncConvertToShared = (project : MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
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

export const asyncConvertToNormal = (project : MyProject) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
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

export const asyncAddContributor = (projectId: string, mail : string) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
   return async (dispatch, getState) => {
      try {
         dispatch(changePendingStatusAction(true))
         //TODO add allow flags
         const contributor = new Contributor("", mail, CONTRIBUTOR_STATUS.PENDING, false, false, "")
         const contributorId = await addContributor(getState().user.id, contributor, projectId, getState().user.email);
         contributor.setId(contributorId)
         dispatch(addContributorAction(projectId, contributor))
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
export const addContributorAction = (projectId: string, contributor: Contributor) : AddContributor => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.ADD_CONTRIBUTOR,
      projectId: projectId,
      contributor: contributor
   }
}

export const asyncAddTime = (projectId: string, shared: boolean, time: number) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
   return async (dispatch, getState) => {
      try {
         dispatch(changePendingStatusAction(true))
         await addTime(getState().user.id, projectId, shared, time);
         dispatch(addTimeAction(projectId, time))
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

export const addTimeAction = (projectId: string, time: number) : AddProjectTime => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.ADD_TIME,
      projectId: projectId,
      time: time,
   }
}

export const asyncEditProjectData = (projectId: string, shared: boolean, name: string, dueDate: Date, color: string, weeklyLimit: number) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
   return async (dispatch, getState) => {
      try {
         dispatch(changePendingStatusAction(true))
         await editProject(getState().user.id, projectId, shared, name, dueDate, color, weeklyLimit);
         dispatch(editProjectAction(projectId, name, dueDate, color, weeklyLimit))
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

export const editProjectAction = (projectId: string, name: string, dueDate: Date, color: string, weeklyLimit: number) : EditProjectData => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.EDIT_PROJECT,
      payload: {
         newData : {
            color,
            name,
            dueDate,
            weeklyLimit
         },
         projectId: projectId
      }
   }
}

export const asyncDeleteContributor = (projectId: string, contributorId: string) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
   return async (dispatch, getState) => {
      try {
         dispatch(changePendingStatusAction(true))
         await deleteContributor(getState().user.id, projectId, contributorId);
         dispatch(deleteContributorAction(projectId, contributorId))
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

export const deleteContributorAction = (projectId: string, contributorId: string) : DeleteContributor => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.DELETE_CONTRIBUTOR,
      contributorId: contributorId,
      projectId: projectId
   }
}

export const asyncAddTask = (projectId: string, shared: boolean ,taskName: string) : ThunkAction<void, RootState, unknown, MyProjectsActions | PendingStatusActions>  => {
   return async (dispatch, getState) => {
      try {
         const newTask : projecTask = {
            text: taskName,
            id: new Date().getTime().toString(),
            dueDate: new Date(),
            done: false
         }
         dispatch(changePendingStatusAction(true))
         await addTask(getState().user.id, projectId, shared, newTask);
         dispatch(addTaskAction(projectId, newTask))
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

export const addTaskAction = (projectId: string, task : projecTask) : AddTask => {
   return {
      type: MY_PROJECTS_ACTION_TYPES.ADD_TASK,
      task: task,
      projectId: projectId
   }
}


