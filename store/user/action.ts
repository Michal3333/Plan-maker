import { SignIn, SignOut, UserActions } from "../types";
import { ThunkAction } from 'redux-thunk'
import { RootState } from "../store";
import { AnyAction, Dispatch } from 'redux'
import { loggingOut, registration, signIn } from "../../API/authorisation";



export enum USER_ACTION_TYPES {
   SIGN_IN = 'SIGN_IN',
   SIGN_OUT = 'SIGN_OUT'
}

export const asyncSignUp = (emial : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      const {registrationResult, uid} = await registration(emial, password)
      dispatch(signInAction(registrationResult, uid))
   }
}

export const asyncSignIn = (emial : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      const {registrationResult, uid} = await signIn(emial, password);
      dispatch(signInAction(registrationResult, uid))
   }
}

export const asyncSignOut = () : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      const succes = await loggingOut();
      if(succes)  dispatch(signOutAction()) 
   }
}

export const signInAction = (result : boolean, id: string) : SignIn => {
   return {
      type: USER_ACTION_TYPES.SIGN_IN,
      result: result,
      id: id
   }
}

export const signOutAction = () : SignOut => {
   return {
      type: USER_ACTION_TYPES.SIGN_OUT
   }
}

