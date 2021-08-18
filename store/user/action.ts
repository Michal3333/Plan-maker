import { AddLogs, ChangePendingStatus, DeleteRaport, GetRaport, InvitationActions, MyProjectsActions, NotificationsActions, PendingStatusActions, SignIn, SignOut, UserActions } from "../types";
import { ThunkAction } from 'redux-thunk'
import { RootState } from "../store";
import { AnyAction, Dispatch } from 'redux'
import { loggingOut, registration, signIn } from "../../API/authorisation";
import { Alert } from "react-native";
import { asyncKeepGettingNotifications } from "../notifications/action";
import { asyncKeepGettingInvitations } from "../invitations/action";
import { changePendingStatusAction } from "../pendingStatus/action";
import { asyncKeepGettingOtherProjects } from "../otherProjects/action";
import { clearWeeklyRaport, fetchTimeLog, getComplitedWeeks, getWeeklyRaport, timeLog } from "../../API/userData";
import { addLogsAction, asyncFetchProjects, setComplitedWeeksAction } from "../myProjects/action";
import RaportObject from "../../models/ReportObject";



export enum USER_ACTION_TYPES {
   SIGN_IN = 'SIGN_IN',
   SIGN_OUT = 'SIGN_OUT',
   GET_RAPORT = 'GET_RAPORT',
   DELETE_RAPORT = 'DELETE_RAPORT'
}

export const asyncSignUp = (email : string, password: string) : ThunkAction<void, RootState, unknown, UserActions | PendingStatusActions | NotificationsActions | InvitationActions>  => {
   return async (dispatch) => {
      try{
         dispatch(changePendingStatusAction(true))
         const uid = await registration(email, password)
         dispatch(signInAction(uid, email))
         await dispatch(asyncKeepGettingNotifications())
         dispatch(asyncKeepGettingInvitations())
         dispatch(asyncKeepGettingOtherProjects())
         dispatch(changePendingStatusAction(false))
      } catch (err : any) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
      }
   }
}

export const asyncSignIn = (email : string, password: string) : ThunkAction<void, RootState, unknown, UserActions | PendingStatusActions | NotificationsActions | InvitationActions | MyProjectsActions>  => {
   return async (dispatch) => {
      try {
         dispatch(changePendingStatusAction(true))
         const uid = await signIn(email, password);
         const logs = await fetchTimeLog(uid)
         const complitedWeeks = await getComplitedWeeks(uid)
         dispatch(signInAction(uid, email))
         dispatch(addLogsAction(logs))
         dispatch(setComplitedWeeksAction(complitedWeeks))
         dispatch(asyncFetchProjects())
         dispatch(asyncKeepGettingNotifications())
         dispatch(asyncKeepGettingInvitations())
         dispatch(asyncKeepGettingOtherProjects())
         dispatch(asyncGetRaport())
         dispatch(changePendingStatusAction(false))
         return true;
      }
      catch (err : any) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
         return false;
      }
   }
}

export const asyncSignOut = () : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      try {
         await loggingOut();
         dispatch(signOutAction()) 
      } catch (err : any) {
         Alert.alert('There is something wrong!', err.message);
      }
      
   }
}

export const signInAction = (id: string, email: string) : SignIn => {
   return {
      type: USER_ACTION_TYPES.SIGN_IN,
      id: id,
      email: email
   }
}

export const signOutAction = () : SignOut => {
   return {
      type: USER_ACTION_TYPES.SIGN_OUT
   }
}

export const asyncGetRaport = () : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch, getStore) => {
      try {
         const objects = await getWeeklyRaport(getStore().user.id);
         dispatch(getRaportAction(objects)) 
      } catch (err : any) {
         Alert.alert('There is something wrong!', err.message);
      }
      
   }
}

export const getRaportAction = (raport : RaportObject[]) : GetRaport => {
   return {
      type: USER_ACTION_TYPES.GET_RAPORT,
      raportObjects: raport
   }
}

export const asyncDeleteRaport = () : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch, getStore) => {
      try {
         await clearWeeklyRaport(getStore().user.id);
         dispatch(deleteRaport()) 
         return true;
      } catch (err : any) {
         Alert.alert('There is something wrong!', err.message);
         return false;
      }
      
   }
}

export const deleteRaport = () : DeleteRaport => {
   return {
      type: USER_ACTION_TYPES.DELETE_RAPORT
   }
}

