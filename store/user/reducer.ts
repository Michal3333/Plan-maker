import { UserActions, UserState } from "../types";
import { USER_ACTION_TYPES } from "./action";



const initialState : UserState = {
   isLoggedIn: false,
   id: '',
   email: '',
}

export default (state = initialState, acton: UserActions ) : UserState => {
   switch(acton.type) {
      case USER_ACTION_TYPES.SIGN_IN:
         return {
            ...state,
            isLoggedIn: true,
            email: acton.email,
            id: acton.id,
         }
      case USER_ACTION_TYPES.SIGN_OUT:
         return {
            ...initialState
         }
   }
   return state;
} 
