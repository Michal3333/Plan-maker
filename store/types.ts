import { USER_ACTION_TYPES } from "./user/action";

export interface UserState {
   isLoggedIn: boolean
}
export type ChangeLoggedIn = {
   type : USER_ACTION_TYPES.CHANEG_LOGGED_IN,
   newStatus : boolean
}

export type UserActions = ChangeLoggedIn