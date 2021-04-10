import { SignUp, UserActions } from "../types";
import { ThunkAction } from 'redux-thunk'
import { RootState } from "../store";
import { AnyAction, Dispatch } from 'redux'
import { registration } from "../../API/authorisation";

export enum USER_ACTION_TYPES {
   SIGN_UP = 'SIGN_UP',
   SIGN_IN = 'SIGN_IN'

}

export const asyncSignUp = (emial : string, password: string) : ThunkAction<void, RootState, unknown, UserActions>  => {
   return async (dispatch) => {
      const {registrationResult, mail} = await registration(emial, password)
      dispatch(signUp(registrationResult, mail))
   }
}

export const signUp = (result : boolean, mail: string) : SignUp => {
   return {
      type: USER_ACTION_TYPES.SIGN_UP,
      result: result,
      mail: mail
   }
}