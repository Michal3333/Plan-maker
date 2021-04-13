import { ChangePendingStatus, SignIn, SignOut, UserActions } from "../types";
import { ThunkAction } from 'redux-thunk'
import { RootState } from "../store";
import { AnyAction, Dispatch } from 'redux'
import { loggingOut, registration, signIn } from "../../API/authorisation";
import { Alert } from "react-native";



export enum USER_ACTION_TYPES {
   SIGN_IN = 'SIGN_IN',
   SIGN_OUT = 'SIGN_OUT',
   CHANGE_PENDING_STATUS = 'CHANGE_PENDING_STATUS'
}

export const asyncSignUp = (emial : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      try{
         dispatch(changePendingStatusAction(true))
         const uid = await registration(emial, password)
         dispatch(signInAction(uid))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
      }
      
   }
}

export const asyncSignIn = (emial : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      try {
         dispatch(changePendingStatusAction(true))
         const uid = await signIn(emial, password);
         dispatch(signInAction(uid))
      }
      catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
      }
   }
}

export const asyncSignOut = () : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      try {
         await loggingOut();
         dispatch(signOutAction()) 
      } catch (err) {
         Alert.alert('There is something wrong!', err.message);
      }
      
   }
}

export const signInAction = (id: string) : SignIn => {
   return {
      type: USER_ACTION_TYPES.SIGN_IN,
      id: id
   }
}

export const signOutAction = () : SignOut => {
   return {
      type: USER_ACTION_TYPES.SIGN_OUT
   }
}
export const changePendingStatusAction = (status : boolean) : ChangePendingStatus => {
   return {
      type: USER_ACTION_TYPES.CHANGE_PENDING_STATUS,
      newStatus: status
   }
}

