import MyProject from "../models/myProject";
import { MY_PROJECTS_ACTION_TYPES } from "./myProjects/action";
import { USER_ACTION_TYPES } from "./user/action";

export interface UserState {
   isLoggedIn: boolean,
   pendingLoggin: boolean
   id: string
}
export type ChangePendingStatus = {
   type: USER_ACTION_TYPES.CHANGE_PENDING_STATUS,
   newStatus : boolean
}
export type SignIn = {
   type : USER_ACTION_TYPES.SIGN_IN,
   id: string
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
export type EditProject = {
   type: MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT,
   projectId: string,
   newData : MyProject
}
export type MyProjectsActions = SetProjects | AddProject | RemoveProject | EditProject
