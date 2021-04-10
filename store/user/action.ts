import { ChangeLoggedIn } from "../types";

export enum USER_ACTION_TYPES {
   CHANEG_LOGGED_IN = 'CHANEG_LOGGED_IN'
}

export const changeLoggedIn = (status : boolean) : ChangeLoggedIn => {
   return {
      type: USER_ACTION_TYPES.CHANEG_LOGGED_IN,
      newStatus: status
   }
}