import MyProject from "../models/myProject";
import { MY_PROJECTS_ACTION_TYPES } from "./myProjects/action";
import { USER_ACTION_TYPES } from "./user/action";

export interface UserState {
   isLoggedIn: boolean,
   pendingLoggin: boolean
   id: string,
   email: string
}
export interface MyProjectsState {
   projects : MyProject[]
}
export type ChangePendingStatus = {
   type: USER_ACTION_TYPES.CHANGE_PENDING_STATUS,
   newStatus : boolean
}
export type SignIn = {
   type : USER_ACTION_TYPES.SIGN_IN,
   id: string,
   email: string
}
export type SignOut = {
   type : USER_ACTION_TYPES.SIGN_OUT
}

export type UserActions = SignIn | SignOut | ChangePendingStatus

export type SetProjects = {
   type: MY_PROJECTS_ACTION_TYPES.SET_PROJECTS,
   projects: MyProject[]
}
export type AddProject = {
   type: MY_PROJECTS_ACTION_TYPES.ADD_PROJECT,
   project: MyProject
}
export type RemoveProject = {
   type: MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT,
   projectId: string
}
export type EditProjectData = {
   type: MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT,
   payload: {
      projectId: string,
      newData : {
         name: string, 
         color: string, 
         dueDate: Date, 
         weeklyLimit : number
      }
   }
}
export type EditProjectTasks = {
   type: MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT,
   projectId: string,
   newData : MyProject
}

export type AddProjectTime = {
   type: MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT,
   projectId: string,
   time : number
}
export type MyProjectsActions = SetProjects | AddProject | RemoveProject | EditProjectData | EditProjectTasks
