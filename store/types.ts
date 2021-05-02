import Contributor from "../models/Contributor";
import MyProject from "../models/MyProject";
import NotificationIn from "../models/NotificationIn";
import { MY_PROJECTS_ACTION_TYPES } from "./myProjects/action";
import { NOTIFICATIONS_ACTION_TYPES } from "./notifications/action";
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
// export type EditProjectData = {
//    type: MY_PROJECTS_ACTION_TYPES.EDIT_PROJECT,
//    payload: {
//       projectId: string,
//       newData : {
//          name: string, 
//          color: string, 
//          dueDate: Date, 
//          weeklyLimit : number
//       }
//    }
// }
// export type EditProjectTasks = {
//    type: MY_PROJECTS_ACTION_TYPES.,
//    projectId: string,
//    newData : MyProject
// }

// export type AddProjectTime = {
//    type: MY_PROJECTS_ACTION_TYPES.REMOVE_PROJECT,
//    projectId: string,
//    time : number
// }
export type ConvertToShared = {
   type: MY_PROJECTS_ACTION_TYPES.CONVERT_TO_SHARED,
   sharedProject : MyProject
}
export type ConvertToNormal = {
   type: MY_PROJECTS_ACTION_TYPES.CONVERT_TO_NORMAL,
   normalProject : MyProject 
}
export type AddContributor = {
   type: MY_PROJECTS_ACTION_TYPES.ADD_CONTRIBUTOR,
   projectId : string,
   contributor: Contributor 
}
// export type MyProjectsActions = SetProjects | AddProject | RemoveProject | EditProjectData | EditProjectTasks | ConvertToShared | ConvertToNormal
export type MyProjectsActions = SetProjects | AddProject | RemoveProject | ConvertToShared | ConvertToNormal | AddContributor

export type NotificationState = {
   unsubscribe : {() : void} | null,
   notifications: NotificationIn[]
}

export type AddNotifications = {
   type: NOTIFICATIONS_ACTION_TYPES.ADD_NOTIFICATIONS,
   notification : NotificationIn
}
export type InitNotifications = {
   type: NOTIFICATIONS_ACTION_TYPES.INIT_NOTIFICATIONS,
   unsubscribe: () => void
}

export type NotificationsActions = AddNotifications | InitNotifications
