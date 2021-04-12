import { USER_ACTION_TYPES } from "./user/action";

export interface UserState {
   isLoggedIn: boolean,
   id: string
}
export type SignIn = {
   type : USER_ACTION_TYPES.SIGN_IN,
   result : boolean,
   id: string
}
export type SignOut = {
   type : USER_ACTION_TYPES.SIGN_OUT
}
export type UserActions = SignIn | SignOut