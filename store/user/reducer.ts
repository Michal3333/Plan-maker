import { UserActions, UserState } from "../types";
import { USER_ACTION_TYPES } from "./action";



const initialState : UserState = {
   isLoggedIn: false,
   mail: ''
}

export default (state = initialState, acton: UserActions) : UserState => {
   switch(acton.type) {
      case USER_ACTION_TYPES.SIGN_UP:
         return {
            isLoggedIn: acton.result,
            mail: acton.mail
         }
   }
   return state;
} 
