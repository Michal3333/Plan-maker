import { UserActions, UserState } from "../types";
import { USER_ACTION_TYPES } from "./action";



const initialState : UserState = {
   isLoggedIn: false,
   pendingLoggin: false,
   id: '',
   email: ''
}

export default (state = initialState, acton: UserActions) : UserState => {
   switch(acton.type) {
      case USER_ACTION_TYPES.SIGN_IN:
         return {
            isLoggedIn: true,
            pendingLoggin: false,
            email: acton.email,
            id: acton.id
         }
      case USER_ACTION_TYPES.SIGN_OUT:
         return {
            ...initialState
         }
      case USER_ACTION_TYPES.CHANGE_PENDING_STATUS:
         return {
            ...state,
            pendingLoggin: acton.newStatus
         }
   }
   return state;
} 
