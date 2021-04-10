import { UserActions, UserState } from "../types";
import { USER_ACTION_TYPES } from "./action";



const initialState : UserState = {
   isLoggedIn: false
}

export default (state = initialState, acton: UserActions) : UserState => {
   switch(acton.type) {
      case USER_ACTION_TYPES.CHANEG_LOGGED_IN:
         return {
            isLoggedIn: acton.newStatus
         }
   }
   return state;
} 
