import { SignIn, UserActions } from "../types";
import { ThunkAction } from 'redux-thunk'
import { RootState } from "../store";
import { AnyAction, Dispatch } from 'redux'
import { registration, signIn } from "../../API/authorisation";
import * as SecureStore from 'expo-secure-store';


export enum USER_ACTION_TYPES {
   SIGN_IN = 'SIGN_IN'
}

export const asyncSignUp = (emial : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      const {registrationResult, uid} = await registration(emial, password)
      if(registrationResult) {
         await SecureStore.setItemAsync('id', uid);
      }
      dispatch(signInAction(registrationResult, uid))
   }
}

export const asyncSignIn = (emial : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      const {registrationResult, uid} = await signIn(emial, password);
      if(registrationResult) {
         await SecureStore.setItemAsync('id', uid);
      }
      dispatch(signInAction(registrationResult, uid))
   }
}

export const signInAction = (result : boolean, id: string) : SignIn => {
   return {
      type: USER_ACTION_TYPES.SIGN_IN,
      result: result,
      id: id
   }
}

