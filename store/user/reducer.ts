import { UserActions, UserState } from "../types";
import { USER_ACTION_TYPES } from "./action";



const initialState : UserState = {
   isLoggedIn: false,
   id: ''
}

export default (state = initialState, acton: UserActions) : UserState => {
   switch(acton.type) {
      case USER_ACTION_TYPES.SIGN_IN:
         return {
            isLoggedIn: acton.result,
            id: acton.id
         }
   }
   return state;
} 
