import { timeLog } from "../API/userData";
import Contributor from "../models/Contributor";
import Invitation from "../models/Invitation";
import MyProject, { projecTask } from "../models/MyProject";
import NotificationUser from "../models/NotificationUser";
import OtherProject from "../models/OtherProject";
import RaportObject from "../models/ReportObject";
import { INVITATION_ACTION_TYPES } from "./invitations/action";
import { MY_PROJECTS_ACTION_TYPES } from "./myProjects/action";
import { NOTIFICATIONS_ACTION_TYPES } from "./notifications/action";
import { OTHER_PROJECTS_ACTION_TYPES } from "./otherProjects/action";
import { PENDING_STATUS_TYPES } from "./pendingStatus/action";
import { USER_ACTION_TYPES } from "./user/action";

export interface PendingState {
   pendingLoggin: boolean
}
export type ChangePendingStatus = {
   type: PENDING_STATUS_TYPES.CHANGE_PENDING_STATUS,
   newStatus : boolean
}

export type PendingStatusActions = ChangePendingStatus

export interface UserState {
   isLoggedIn: boolean,
   id: string,
   email: string,
   raportObjects : RaportObject[]
}
export type sortID = 'nameAsc' | 'nameDesc' | 'typeAsc' | 'typeDesc'

export type sortOption = {
   text: string,
   id: sortID,
   selected: boolean
}
export interface MyProjectsState {
   projects : MyProject[],
   logs : timeLog[],
   complitedWeeks: number,
   sortOptions: sortOption[]
}

export type SignIn = {
   type : USER_ACTION_TYPES.SIGN_IN,
   id: string,
   email: string
}
export type SignOut = {
   type : USER_ACTION_TYPES.SIGN_OUT
}
export type GetRaport = {
   type : USER_ACTION_TYPES.GET_RAPORT,
   raportObjects: RaportObject[]
}
export type DeleteRaport = {
   type: USER_ACTION_TYPES.DELETE_RAPORT
}

export type UserActions = SignIn | SignOut | GetRaport | DeleteRaport

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
   type: MY_PROJECTS_ACTION_TYPES.EDIT_PROJECT,
   payload: {
      projectId: string,
      newData : {
         name: string, 
         color: string, 
         dueDate: Date, 
         weeklyLimit : number
         icon: string
      }
   }
}
export type AddProjectTime = {
   type: MY_PROJECTS_ACTION_TYPES.ADD_TIME,
   projectId: string,
   time : number
}
export type AddLogs = {
   type : MY_PROJECTS_ACTION_TYPES.ADD_LOGS,
   logs : timeLog[]
}
export type AddTask = {
   type: MY_PROJECTS_ACTION_TYPES.ADD_TASK,
   projectId: string,
   task : projecTask
}
export type DeleteTask = {
   type: MY_PROJECTS_ACTION_TYPES.DELETE_TASK,
   projectId: string,
   task : projecTask
}
export type UpdateTask = {
   type: MY_PROJECTS_ACTION_TYPES.UPDATE_TASK,
   projectId: string,
   taskId : string,
   done : boolean,
   text: string
}
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
export type DeleteContributor = {
   type: MY_PROJECTS_ACTION_TYPES.DELETE_CONTRIBUTOR,
   contributorId : string,
   projectId: string
}
export type UpdateContributor = {
   type: MY_PROJECTS_ACTION_TYPES.UPDATE_CONTRIBUTOR,
   projectId: string,
   contributorId : string,
   allowMessages: boolean,
   allowDetails: boolean
}
export type SetComplitedWeeks = {
   type: MY_PROJECTS_ACTION_TYPES.FETCH_COMPLITED_WEEKS,
   weeksNumber: number
}
export type SortProjects = {
   type: MY_PROJECTS_ACTION_TYPES.SORT_PROJECTS,
}
export type ChangeSortId = {
   type: MY_PROJECTS_ACTION_TYPES.CHANGE_SORTID,
   sortId : sortID
}
export type MyProjectsActions = SetProjects | AddProject | RemoveProject | ConvertToShared | ConvertToNormal | AddContributor | AddProjectTime | EditProjectData | DeleteContributor | AddTask | UpdateTask | DeleteTask | UpdateContributor | AddLogs | SetComplitedWeeks | SortProjects | ChangeSortId

export type NotificationState = {
   unsubscribe : {() : void} | null,
   notifications: NotificationUser[]
}
export type AddNotifications = {
   type: NOTIFICATIONS_ACTION_TYPES.ADD_NOTIFICATIONS,
   notification : NotificationUser
}
export type InitNotifications = {
   type: NOTIFICATIONS_ACTION_TYPES.INIT_NOTIFICATIONS,
   unsubscribe: () => void
}
export type DeleteNotification = {
   type: NOTIFICATIONS_ACTION_TYPES.DELETE_NOTIFICATION,
   notificationId : string
}
export type NotificationsActions = AddNotifications | InitNotifications | DeleteNotification

export type InvitationsState = {
   unsubscribe : {() : void} | null,
   invitations: Invitation[]
}
export type DeleteAnsweredInvitation = {
   type: INVITATION_ACTION_TYPES.DELETE_ANSWER_INVITATION,
   invitationId : string
}
export type InitInvitations = {
   type: INVITATION_ACTION_TYPES.INIT_INVITATIONS,
   unsubscribe: () => void
}
export type AddInvitation = {
   type: INVITATION_ACTION_TYPES.ADD_INVITATION,
   invitation : Invitation
}

export type InvitationActions = DeleteAnsweredInvitation | InitInvitations | AddInvitation;

export type OtherProjectsState = {
   otherProjects : OtherProject[],
   unsubscribe: {() : void} | null
}

export type InitOtherProjects = {
   type: OTHER_PROJECTS_ACTION_TYPES.INIT_OTHER_PROJECTS,
   unsubscribe: () => void
}
export type AddOtherProject = {
   type: OTHER_PROJECTS_ACTION_TYPES.ADD_OTHER_PROJECT,
   otherProject : OtherProject
}
export type UpdateOtherProject = {
   type: OTHER_PROJECTS_ACTION_TYPES.UPDATE_OTHER_PROJECT,
   otherProject : OtherProject
}
export type DeleteOtherProject = {
   type: OTHER_PROJECTS_ACTION_TYPES.DELETE_OTHER_PROJECT,
   otherProjectId : string 
}

export type OtherProjectsActions = InitOtherProjects | AddOtherProject | UpdateOtherProject | DeleteOtherProject
