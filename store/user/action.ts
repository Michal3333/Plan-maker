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

export const asyncSignUp = (email : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      try{
         dispatch(changePendingStatusAction(true))
         const uid = await registration(email, password)
         dispatch(signInAction(uid, email))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
         dispatch(changePendingStatusAction(false))
      }
      
   }
}

export const asyncSignIn = (email : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      try {
         dispatch(changePendingStatusAction(true))
         const uid = await signIn(email, password);
         dispatch(signInAction(uid, email))
         return true;
      }
      catch (err) {
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
      } catch (err) {
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
export const changePendingStatusAction = (status : boolean) : ChangePendingStatus => {
   return {
      type: USER_ACTION_TYPES.CHANGE_PENDING_STATUS,
      newStatus: status
   }
}

